// pages/CheckoutPage.js

class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Форма
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');

    // Overview страница
    this.finishButton = page.locator('[data-test="finish"]');

    // Финальная страница
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }

  // Метод: заполнить форму checkout
  async fillForm(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
  }
}

module.exports = { CheckoutPage };