import { expect, Page } from "@playwright/test";

/**
 * Base page class that provides common functionality for all page objects
 */
export class basepage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Get the current page URL
     * @returns The current URL of the page
     */
    async PageUrl() {
        return this.page.url();
    }

    /**
     * Get the current page title
     * @returns The title of the page
     */
    async assertTitle() {
        return this.page.title();
    }

    /**
     * Get the cart badge count (number of items in cart)
     * @returns The number of items displayed in the cart badge
     */
    async getCartBadgeCount(): Promise<number> {
        let cartBadge = await this.page.locator('[data-test=shopping-cart-badge]').textContent();
        return parseInt(cartBadge || '0', 10);
    }

}