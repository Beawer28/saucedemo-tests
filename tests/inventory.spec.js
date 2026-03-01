// tests/inventory.spec.js

const { test, expect } = require('./fixtures');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('Inventory Page', () => {

  // beforeEach больше нет! Логин внутри fixture
  test('страница товаров загружается с заголовком Products', async ({ pages }) => {
    await expect(pages.inventory.title).toHaveText('Products');
  });

  test('отображается 6 товаров', async ({ pages }) => {
    await expect(pages.inventory.inventoryItems).toHaveCount(6);
  });

  test('корзина и бургер-меню видны', async ({ pages }) => {
    await expect(pages.inventory.cartLink).toBeVisible();
    await expect(pages.inventory.burgerMenu).toBeVisible();
  });

  test('добавление товара в корзину', async ({ pages }) => {
    await pages.inventory.addBackpack.click();
    await expect(pages.inventory.cartBadge).toHaveText('1');
    await expect(pages.inventory.removeBackpack).toBeVisible();
  });

  test('удаление товара из корзины', async ({ pages }) => {
    await pages.inventory.addBackpack.click();
    await expect(pages.inventory.cartBadge).toHaveText('1');
    await pages.inventory.removeBackpack.click();
    await expect(pages.inventory.cartBadge).not.toBeVisible();
  });

});