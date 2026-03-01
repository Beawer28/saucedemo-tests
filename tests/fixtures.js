// tests/fixtures.js

const { test: base } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

const test = base.extend({

  // Fixture 1: логин standard_user — для inventory тестов
  pages: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await use({
      inventory: new InventoryPage(page),
      cart: new CartPage(page),
      checkout: new CheckoutPage(page),
      page,
    });
  },

  // Fixture 2: логин + товар в корзине — для checkout тестов
  cartReady: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    const inventory = new InventoryPage(page);
    await inventory.addBackpack.click();
    await inventory.cartLink.click();

    await use({
      cart: new CartPage(page),
      checkout: new CheckoutPage(page),
      page,
    });
  },

  // Fixture 3: логин problem_user — для тестов багов
  problemUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('problem_user', 'secret_sauce');

    await use({
      inventory: new InventoryPage(page),
      cart: new CartPage(page),
      checkout: new CheckoutPage(page),
      page,
    });
  },

});

const { expect } = require('@playwright/test');
module.exports = { test, expect };