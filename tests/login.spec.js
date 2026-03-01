const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login Page', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  // 1. Успешный логин
  test('успешный логин standard_user', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  // 2. Пустой username
  test('ошибка при пустом username', async () => {
    await loginPage.login('', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  // 3. Пустой password
  test('ошибка при пустом password', async () => {
    await loginPage.login('standard_user', '');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });

  // 4. Неверный пароль
  test('ошибка при неверном пароле', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('do not match');
  });

  // 5. Неверный username
  test('ошибка при неверном username', async () => {
    await loginPage.login('invalid_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('do not match');
  });

  // 6. Кнопка логина кликабельна
  test('кнопка Login активна', async () => {
    await expect(loginPage.loginButton).toBeEnabled();
  });

  // 7. После логина видна страница товаров
  test('после логина отображается заголовок Products', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page.locator('.title')).toHaveText('Products');
  });

});

// 8. Отдельный тест — вне describe, т.к. locked_out не должен попасть на сайт
test('заблокированный пользователь не может войти', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('locked out');
});