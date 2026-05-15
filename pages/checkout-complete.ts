import { expect, type Locator, type Page } from '@playwright/test';
import { basepage } from './basepage';

/**
 * Checkout complete page object for verifying order completion
 */
export class CompletePage extends basepage {


    headerComplete: Locator;

    /**
     *
     */
    constructor(page: Page) {
        super(page);
        this.headerComplete = this.page.locator("#checkout_complete_container > h2");
    }

    /**
     * Get the completion message text content
     * @returns The text of the completion message
     */
    async GetCompleteMessage(): Promise<string | null> {
        return await this.headerComplete.textContent();
    }

}