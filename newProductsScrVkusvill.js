const puppeteer = require('puppeteer');

const chromeUrl = 'http://127.0.0.1:9222';

const url = 'https://vkusvill.ru/';
const pricesSelector = '.ProductCards__list[data-list-name="Новинки на главной"] .Price__value';
const namesSelector = '.ProductCards__list[data-list-name="Новинки на главной"] .ProductCard__link';

const scrapeFromOpenedBrowser = async () => {
  try {
    const browser = await puppeteer.connect({
      browserURL: chromeUrl
    });

    const pages = await browser.pages();

    const page = await pages[0];

    await page.setViewport({width: 1920, height: 1080});

    await page.goto(url);

    await page.waitForSelector('.ProductCards__list[data-list-name="Новинки на главной"]');

    const pricesArray = await page.$$eval(pricesSelector, results => {
      return results.map(res => res.textContent);
    });

    const namesArray = await page.$$eval(namesSelector, results => {
      return results.map(res => res.title);
    });

    const resultArray = [];

    for (let i=0; i < pricesArray.length; i++) {
      resultArray.push({name: namesArray[i], price: pricesArray[i]});
    }

    await browser.close();

    return {pricesArray, namesArray, resultArray};

  } catch (err) {
    console.log(err);
  }
}

scrapeFromOpenedBrowser()
  .then(res => console.log(res));