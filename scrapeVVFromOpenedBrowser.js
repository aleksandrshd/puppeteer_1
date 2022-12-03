const puppeteer = require('puppeteer');

const chromeUrl = 'http://127.0.0.1:9222';

const url = 'https://vkusvill.ru/cart/';
const selector = '#ex-body-inner > div.js-Delivery__Order-content > div.Container.Delivery__Order.js-Delivery__Order-container > form > div > div.Delivery__Order-col.Delivery__Order-col--Order > div.Delivery__Order__OrderBody-Block._test-abc > div.Delivery__Order__OrderBody-Block--Phone.lk-displayflex.lk-displayflex-spacebtwn.lk-displayflex-vcenter > span';

const scrapeFromOpenedBrowser = async () => {
  try {
    const browser = await puppeteer.connect({
      browserURL: chromeUrl
    });
    const pages = await browser.pages();
    const page = await pages[0];
    await page.setViewport({width: 1920, height: 1080});
    await page.goto(url);

    const number = await page.$eval(selector, el => el.innerText);

    await page.screenshot({path: 'scrapeFromOpenedBrowser.png'});

    await browser.close();

    return {phoneNumber: number};

  } catch (err) {
    console.log(err);
  }
}

scrapeFromOpenedBrowser()
  .then(res => console.log(res));