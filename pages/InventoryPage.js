// pages/InventoryPage.js

class InventoryPage {
  constructor(page) {
    this.page = page;

    // Селекторы страницы каталога
    this.title = page.locator('[data-test="title"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.burgerMenu = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');

    // Кнопки товаров
    this.addBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.removeBackpack = page.locator('[data-test="remove-sauce-labs-backpack"]');

    // Список всех товаров
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
  }
}

module.exports = { InventoryPage };