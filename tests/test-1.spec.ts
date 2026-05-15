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
    await Inventory.ResetState();
    await Inventory.AddOneItem(0);
    //first check to cart badge
    expect(await Inventory.getCartBadgeCount()).toBeGreaterThanOrEqual(1);
    await Inventory.cartLink.click();

    Cart = new CartPage(page);

    //first check to items count
    expect(await Cart.getCartItems()).toBeGreaterThanOrEqual(1);
    await Cart.checkoutButton.click();

    CheckOutCustomer = new CheckoutCustomerPage(page);

    await CheckOutCustomer.fillCustomerData("Martin", "Prueba", "1111");
    await CheckOutCustomer.clickContinue();

    CheckOutReview = new CheckoutReviewPage(page);

    //last check to cart badge
    expect(await CheckOutReview.getCartBadgeCount()).toBeGreaterThanOrEqual(1);
    //last check to items count
    expect(await CheckOutReview.getReviewedItems()).toBeGreaterThanOrEqual(1);

    await CheckOutReview.clickFinish();

    CheckOutComplete = new CompletePage(page);

    //check to final message
    expect(await CheckOutComplete.GetCompleteMessage()).toBe("Thank you for your order!");

  });

  test(`Multiple purchase with Standard User is OK`, async ({ page }) => {

    Login = new LoginPage(page);
    await Login.sendTextUser(users.Standard);
    await Login.sendTextPass(secret.getPassword());
    await Login.ClicksubmitButton();

    Inventory = new InventoryPage(page);
    await Inventory.ResetState();

    await Inventory.AddOneItem(0);

    const InitialCount = await Inventory.getCartBadgeCount();

    await Inventory.AddMultipleItems(3);

    const FinalCount = await Inventory.getCartBadgeCount();

    //first check to cart badge
    expect(await Inventory.getCartBadgeCount()).toBe(4);
    //check to cart badge has increased
    expect(FinalCount).toBeGreaterThan(InitialCount);

    await Inventory.cartLink.click();

    Cart = new CartPage(page);

    //first check to items count
    expect(await Cart.getCartItems()).toBe(4);
    await Cart.checkoutButton.click();

    CheckOutCustomer = new CheckoutCustomerPage(page);

    await CheckOutCustomer.fillCustomerData("Martin", "Prueba", "1111");
    await CheckOutCustomer.clickContinue();

    CheckOutReview = new CheckoutReviewPage(page);


    //last check to cart badge
    expect(await CheckOutReview.getCartBadgeCount()).toBe(4);
    //last check to items count
    expect(await CheckOutReview.getReviewedItems()).toBe(4);

    await CheckOutReview.clickFinish();

    CheckOutComplete = new CompletePage(page);

    //check to final message
    expect(await CheckOutComplete.GetCompleteMessage()).toBe("Thank you for your order!");
  });

  test(`Test menu items in Inventory page with Standard User`, async ({ page }) => {
    Login = new LoginPage(page);
    await Login.sendTextUser(users.Standard);
    await Login.sendTextPass(secret.getPassword());
    await Login.ClicksubmitButton();

    Inventory = new InventoryPage(page);
    await Inventory.OpenMenu();
    expect(await Inventory.getMenuItemsCount()).toBe(4);
    expect(await Inventory.getTextMenuItem(0)).toBe("All Items");
    expect(await Inventory.getTextMenuItem(1)).toBe("About");
    expect(await Inventory.getTextMenuItem(2)).toBe("Logout");
    expect(await Inventory.getTextMenuItem(3)).toBe("Reset App State");
    await Inventory.CloseMenu();

  });

  test(`Test AZ filters Inventory page with Standard User`, async ({ page }) => {
    Login = new LoginPage(page);
    await Login.sendTextUser(users.Standard);
    await Login.sendTextPass(secret.getPassword());
    await Login.ClicksubmitButton();

    Inventory = new InventoryPage(page);

    let titles = await Inventory.GetAllItemDescriptions();

    //order
    let manualOrderedTitles = titles.toSorted();

    //filter
    await Inventory.clickFiltersOptions(0);
    titles = await Inventory.GetAllItemDescriptions();

    //compare
    expect(titles).toEqual(manualOrderedTitles);

    //reverse order
    manualOrderedTitles = titles.reverse();

    //reverse filter
    await Inventory.clickFiltersOptions(1);
    titles = await Inventory.GetAllItemDescriptions();

    //compare
    expect(titles).toEqual(manualOrderedTitles);

  });

  test(`Test Price filters Inventory page with Standard User`, async ({ page }) => {
    Login = new LoginPage(page);
    await Login.sendTextUser(users.Standard);
    await Login.sendTextPass(secret.getPassword());
    await Login.ClicksubmitButton();

    Inventory = new InventoryPage(page);

    let prices = await Inventory.GetAllItemPrices();

    //order
    let manualOrderedPrices = prices.sort((n1, n2) => n1 > n2 ? 1 : -1);

    //filter
    await Inventory.clickFiltersOptions(2);
    prices = await Inventory.GetAllItemPrices();

    //compare
    expect(prices).toEqual(manualOrderedPrices);

    //reverse order
    manualOrderedPrices = prices.reverse();

    //reverse filter
    await Inventory.clickFiltersOptions(3);
    prices = await Inventory.GetAllItemPrices();

    //compare
    expect(prices).toEqual(manualOrderedPrices);

  });

  test(`Test Remove action in cart with Standard User`, async ({ page }) => {
    Login = new LoginPage(page);
    await Login.sendTextUser(users.Standard);
    await Login.sendTextPass(secret.getPassword());
    await Login.ClicksubmitButton();

    Inventory = new InventoryPage(page);
    await Inventory.ResetState();

    await Inventory.AddMultipleItems(2);

    await Inventory.cartLink.click();
    Cart = new CartPage(page);

    //first check to items count
    expect(await Cart.getCartItems()).toBe(2);

    await Cart.removeItem(0);

    //second check
    expect(await Cart.getCartItems()).toBe(1);

  });

  test(`Test Error message in checkout with Standard User`, async ({ page }) => {
    Login = new LoginPage(page);
    await Login.sendTextUser(users.Standard);
    await Login.sendTextPass(secret.getPassword());
    await Login.ClicksubmitButton();

    Inventory = new InventoryPage(page);
    await Inventory.AddOneItem(0);
    await Inventory.GoToCart();

    Cart = new CartPage(page);
    await Cart.clickCheckout();

    CheckOutCustomer = new CheckoutCustomerPage(page);
    await CheckOutCustomer.clickContinue();

    expect(await CheckOutCustomer.getErrorMessage()).toBe("Error: First Name is required");

  });

  test(`Test Error message in LoginPage with Locked_out User`, async ({ page }) => {
    Login = new LoginPage(page);
    await Login.sendTextUser(users.LockedOut);
    await Login.sendTextPass(secret.getPassword());
    await Login.ClicksubmitButton();
    expect(await Login.getErrorMessage()).toBe("Epic sadface: Sorry, this user has been locked out.");
  });

    test(`Single purchase FAILS with Error User`, async ({ page }) => {

    Login = new LoginPage(page);
    await Login.sendTextUser(users.Error);
    await Login.sendTextPass(secret.getPassword());
    await Login.ClicksubmitButton();

    Inventory = new InventoryPage(page);

    await Inventory.AddOneItem(0);
    //first check to cart badge
    expect(await Inventory.getCartBadgeCount()).toBeGreaterThanOrEqual(1);
    await Inventory.cartLink.click();

    Cart = new CartPage(page);

    //first check to items count
    expect(await Cart.getCartItems()).toBeGreaterThanOrEqual(1);
    await Cart.checkoutButton.click();

    CheckOutCustomer = new CheckoutCustomerPage(page);

    await CheckOutCustomer.fillCustomerData("Martin", "Prueba", "1111");
    await CheckOutCustomer.clickContinue();

    CheckOutReview = new CheckoutReviewPage(page);

    //last check to cart badge
    expect(await CheckOutReview.getCartBadgeCount()).toBeGreaterThanOrEqual(1);
    //last check to items count
    expect(await CheckOutReview.getReviewedItems()).toBeGreaterThanOrEqual(1);

    await CheckOutReview.clickFinish();

    CheckOutComplete = new CompletePage(page);

    //check to final message
    expect(await CheckOutComplete.GetCompleteMessage()).toBe("Thank you for your order!");

  });

  
    test(`Repeated images in inventory page with Problem User`, async ({ page }) => {

    Login = new LoginPage(page);
    await Login.sendTextUser(users.ProblemUser);
    await Login.sendTextPass(secret.getPassword());
    await Login.ClicksubmitButton();

    Inventory = new InventoryPage(page);

    
	  let texts = await Inventory.GetAllItemImages();

    //expect all the text images are the same
    expect(texts.every(text => text === texts[0])).toBeTruthy();

    });
  
  test(`Test Error message in LoginPage with wrong credentials`, async ({ page }) => {
    Login = new LoginPage(page);
    await Login.sendTextUser(users.PerformanceGlitch);
    await Login.sendTextPass("wrong_password");
    await Login.ClicksubmitButton();
    expect(await Login.getErrorMessage()).toBe("Epic sadface: Username and password do not match any user in this service");
  });

});

test.afterEach(async ({ page }) => {
  await page.close();
});