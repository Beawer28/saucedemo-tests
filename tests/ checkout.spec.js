// tests/checkout.spec.js

const { test, expect } = require('./fixtures');

test.describe('Cart & Checkout', () => {

  // beforeEach исчез! Всё внутри cartReady fixture

  test('товар отображается в корзине', async ({ cartReady }) => {
    await expect(cartReady.cart.cartItems).toHaveCount(1);
  });

  test('можно перейти к checkout', async ({ cartReady }) => {
    await cartReady.cart.checkoutButton.click();
    await expect(cartReady.page).toHaveURL(/checkout-step-one/);
  });

  test('пустая форма checkout показывает ошибку', async ({ cartReady }) => {
    await cartReady.cart.checkoutButton.click();
    await cartReady.checkout.continueButton.click();
    await expect(cartReady.checkout.errorMessage).toBeVisible();
    await expect(cartReady.checkout.errorMessage).toContainText('First Name is required');
  });

  test('полный checkout — от корзины до подтверждения заказа', async ({ cartReady }) => {
    await cartReady.cart.checkoutButton.click();
    await cartReady.checkout.fillForm('John', 'Doe', '12345');
    await expect(cartReady.page).toHaveURL(/checkout-step-two/);
    await cartReady.checkout.finishButton.click();
    await expect(cartReady.checkout.completeHeader).toHaveText('Thank you for your order!');
    await expect(cartReady.page).toHaveURL(/checkout-complete/);
  });

  test('после заказа можно вернуться к товарам', async ({ cartReady }) => {
    await cartReady.cart.checkoutButton.click();
    await cartReady.checkout.fillForm('John', 'Doe', '12345');
    await cartReady.checkout.finishButton.click();
    await cartReady.checkout.backToProductsButton.click();
    await expect(cartReady.page).toHaveURL(/inventory/);
  });

});