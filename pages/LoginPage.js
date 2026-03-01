// pages/LoginPage.js

class LoginPage {
  constructor(page) {
    this.page = page;

    // Селекторы страницы логина
    this.usernameField = page.locator('[data-test="username"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.logo = page.getByText('Swag Labs');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Открыть страницу
  async open() {
    await this.page.goto('https://www.saucedemo.com');
  }

  // Залогиниться
  async login(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };