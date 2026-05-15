import { expect, type Locator, type Page } from '@playwright/test';
import { basepage } from './basepage';

/**
 * Checkout review page object for verifying order details before completion
 */
export class CheckoutReviewPage extends basepage {

    finishButton: Locator;
    cancelButton: Locator;
    cartItems: Locator;
    
    constructor(page: Page) {
        super(page);
        this.finishButton = this.page.getByRole('button', { name: 'Finish' });
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });
        this.cartItems = this.page.locator('[data-test=inventory-item]');
        
    }

    /**
     * Click the finish button to complete the order
     */
    async clickFinish() {
        await this.finishButton.click();
    }

    /**
     * Click the cancel button to abort the order
     */
    async clickCancel() {
        await this.cancelButton.click();
    }

    /**
     * Get the count of items being reviewed
     * @returns The number of items in the order
     */
    async getReviewedItems(): Promise<number> {
        return await this.cartItems.count();
    }
}
