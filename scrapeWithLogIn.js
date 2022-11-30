const puppeteer = require('puppeteer');

const url = 'https://www.dns-shop.ru/';
const selector = '#cart-page-new > div.cart-page-new > div.cart-page-new__header > div > div';

const email = 'aleksandrs.hd@yandex.ru';
const password = 'DnsTestPassword';

const scrapeWithLogIn = async () => {
  try {
    const browser = await puppeteer.launch(
      {
        headless: false,
        defaultViewport: null,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        args: ['--start-maximized']
      });

    const page = await browser.newPage();

    await page.goto(url);

    await page.click('#user-menu > div > div.user-profile__login > div');
    await page.click('#user-menu > div > div.user-profile__menu > div.user-profile__wrapper > div > div.user-profile__guest > button');
    await page.click('#user-menu > div > div.user-profile__menu > div.user-profile__wrapper > div > div:nth-child(2) > a');
    await page.click('#user-menu > div.base-ui-modal > div.base-ui-modal__container.base-ui-modal__container_default > modal > div > div > div > div.block-other-login-methods > div.block-other-login-methods__buttons > div > div');

    await page.type('#user-menu > div.base-ui-modal > div.base-ui-modal__container.base-ui-modal__container_default > modal > div > div > div > div.form-entry-with-password__input > div > input', email)
    await page.keyboard.press('Tab');
    await page.keyboard.type(password);
    await page.keyboard.press('Enter');

    await page.waitForSelector('#user-menu > div > div.user-profile__container > svg');

    await page.goto(`${url}cart/`);

    const amountOfGoods = await page.$eval(selector, el => el.innerText);

    await page.screenshot({path: 'scrapeWithLogIn.png'});

    await browser.close();

    return {amountOfGoods: amountOfGoods};

  } catch (err) {
    console.log(err);
  }
}

scrapeWithLogIn()
  .then(res => console.log(res));