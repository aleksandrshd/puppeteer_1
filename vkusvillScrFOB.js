const puppeteer = require('puppeteer');

const chromeUrl = 'http://127.0.0.1:9222';

const url = 'https://vkusvill.ru/cart/';
const pricesSelector = '.OrderFormProdSliderSwiperWrapper[data-list-name="Корзина Зеленые ценники"] .Price--green-label .Price__value';
const namesSelector = '.OrderFormProdSliderSwiperWrapper[data-list-name="Корзина Зеленые ценники"] .ProductCard__link';
/*const elementsSelector = '.OrderFormProdSliderSwiperWrapper[data-list-name="Корзина Зеленые ценники"] .ProductCard__content';*/

const scrapeFromOpenedBrowser = async () => {
  try {
    const browser = await puppeteer.connect({
      browserURL: chromeUrl
    });

    const pages = await browser.pages();

    const page = await pages[0];

    await page.setViewport({width: 1920, height: 1080});

    await page.goto(url);

    await page.waitForSelector('.OrderFormProdSliderSwiperWrapper');

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

   /* const elementsArray = await page.$$eval(elementsSelector, results => {
      return results.map(res => {
        const element = res.innerHTML;
        const nameLink = element.querySelector('.ProductCard__link');
        const name = nameLink.title;
        return name;
      });
    });*/


    await browser.close();

    return {pricesArray, namesArray, resultArray};

  } catch (err) {
    console.log(err);
  }
}

scrapeFromOpenedBrowser()
  .then(res => console.log(res));