import { expect, type Locator, type Page } from '@playwright/test';
import { basepage } from './basepage';

/**
 * Shopping cart page object for managing cart operations
 */
export class CartPage extends basepage {

    cartItems: Locator;
    cartButton: Locator;
    checkoutButton: Locator;
    continueShoppingButton: Locator;
    cartItemPrice: Locator;
    cartItemName: Locator;

    constructor(page: Page) {
        super(page);
        this.cartItems = this.page.locator('[data-test=inventory-item]');
        this.cartButton = this.page.locator('[data-test=shopping-cart-link]');
        this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
        this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
        this.cartItemPrice = this.page.locator('[data-test=inventory-item-price]');
        this.cartItemName = this.page.locator('[data-test=inventory-item-name]');
    }

    /**
     * Click the checkout button to proceed to checkout
     */
    async clickCheckout() {
        await this.checkoutButton.click();
    }

    /**
     * Click the continue shopping button to return to inventory
     */
    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }

    /**
     * Get the total number of items in the cart
     * @returns The count of items currently in the cart
     */
    async getCartItems() {
        return this.cartItems.count();
    }

    /**
     * Remove an item from the cart by index
     * @param index - The index of the item to remove
     */
    async removeItemFromCart(index: number) {
        await this.cartItems.nth(index).getByRole('button', { name: /Remove/i }).click();
    }
}
