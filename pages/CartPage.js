// pages/CartPage.js

class CartPage {
  constructor(page) {
    this.page = page;

    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }
}

module.exports = { CartPage };