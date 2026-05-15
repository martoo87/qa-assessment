import { test, expect } from '@playwright/test';
import { Users } from '../Utilities/Users';
import { Secret } from '../Utilities/Secret';
import { Constants } from '../Utilities/const';
import { LoginPage } from '../pages/login';
import { InventoryPage } from '../pages/inventory';
import { CartPage } from '../pages/cart';
import { CheckoutCustomerPage } from '../pages/checkout-customer';
import { CheckoutReviewPage } from '../pages/checkout-review';
import { CompletePage } from '../pages/checkout-complete';

const secret = new Secret();
const users = new Users();
let Login, Inventory, Cart, CheckOutCustomer, CheckOutReview, CheckOutComplete;

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
      await page.goto(Constants.BASE_URL);
});

test.describe('Tests described in TEST_PLAN.md', () => {

  test(`Single purchase with Standard User is OK`, async ({ page }) => {

    Login = new LoginPage(page);
    await Login.sendTextUser(users.Standard);
    await Login.sendTextPass(secret.getPassword());
    await Login.ClicksubmitButton();

    Inventory = new InventoryPage(page);

    expect(await Inventory.PageUrl()).toContain("inventory.html");

    await Inventory.AddOneItem(0);
    //first check to cart badge
    expect(await Inventory.getCartBadgeCount()).toBeGreaterThanOrEqual(1);
    await Inventory.cartLink.click();

    Cart = new CartPage(page);

    expect(await Cart.PageUrl()).toContain("cart.html");
    //first check to items count
    expect(await Cart.getCartItems()).toBeGreaterThanOrEqual(1);
    await Cart.checkoutButton.click();

    CheckOutCustomer = new CheckoutCustomerPage(page);

    expect(await CheckOutCustomer.PageUrl()).toContain("checkout-step-one.html");
    await CheckOutCustomer.fillCustomerData("Martin", "Prueba", "1111");
    await CheckOutCustomer.clickContinue();

    CheckOutReview = new CheckoutReviewPage(page);

    expect(await CheckOutReview.PageUrl()).toContain("checkout-step-two.html");

    //last check to cart badge
    expect(await CheckOutReview.getCartBadgeCount()).toBeGreaterThanOrEqual(1);
    //last check to items count
    expect(await CheckOutReview.getReviewedItems()).toBeGreaterThanOrEqual(1);

    await CheckOutReview.clickFinish();

    CheckOutComplete = new CompletePage(page);

    expect(await CheckOutComplete.PageUrl()).toContain("checkout-complete.html");

    //check to final message
    expect(await CheckOutComplete.GetCompleteMessage()).toBe("Thank you for your order!");

  });
  
  test(`Failling test`, async ({ page }) => {
    CheckOutComplete = new CompletePage(page);
    expect(await CheckOutComplete.GetCompleteMessage()).toBe("Thank you for your order!");
  });

});
  
  test.afterEach(async ({ page }) => {
    await page.close();
  });