// tests/problem-user.spec.js

const { test, expect } = require('./fixtures');

test.describe('Problem User Bugs', () => {

  // beforeEach исчез! Логин внутри problemUser fixture

  test('все картинки товаров должны быть разными', async ({ problemUser }) => {
    const images = problemUser.page.locator('[data-test="inventory-item"] img');
    const allSrc = await images.evaluateAll(
      imgs => imgs.map(img => img.src)
    );
    const uniqueSrc = new Set(allSrc);

    // БАГ: упадёт — все картинки одинаковые у problem_user
    expect(uniqueSrc.size).toBe(allSrc.length);
  });

  test('Last Name заполняется в форме checkout', async ({ problemUser }) => {
    await problemUser.inventory.addBackpack.click();
    await problemUser.inventory.cartLink.click();
    await problemUser.cart.checkoutButton.click();

    await problemUser.checkout.lastName.fill('TestLastName');

    // БАГ: упадёт — поле сбрасывается у problem_user
    await expect(problemUser.checkout.lastName).toHaveValue('TestLastName');
  });

  test('можно завершить checkout полностью', async ({ problemUser }) => {
    await problemUser.inventory.addBackpack.click();
    await problemUser.inventory.cartLink.click();
    await problemUser.cart.checkoutButton.click();
    await problemUser.checkout.fillForm('John', 'Doe', '12345');

    // БАГ: упадёт — checkout не завершается у problem_user
    await expect(problemUser.page).toHaveURL(/checkout-step-two/);
  });

});