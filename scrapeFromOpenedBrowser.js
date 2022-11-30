const puppeteer = require('puppeteer');

const chromeUrl = 'http://127.0.0.1:9222';

const url = 'https://www.komus.ru/cart';
const selector = '#product-0 > div.cart-item__price > div.cart-item__price-total > span.js-product-price.cart-item__price-indent';

const scrapeFromOpenedBrowser = async () => {
  try {
    const browser = await puppeteer.connect({
      browserURL: chromeUrl
    });
    const pages = await browser.pages();
    const page = await pages[0];
    await page.setViewport({width: 1920, height: 1080});
    await page.goto(url);

    const price = await page.$eval(selector, el => el.innerText);

    await page.screenshot({path: 'scrapeFromOpenedBrowser.png'});

    await browser.close();

    return {price: price};

  } catch (err) {
    console.log(err);
  }
}

scrapeFromOpenedBrowser()
  .then(res => console.log(res));