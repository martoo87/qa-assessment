import { expect, type Locator, type Page } from '@playwright/test';
import { basepage } from './basepage';

/**
 * Checkout customer information page object for collecting customer details
 */
export class CheckoutCustomerPage extends basepage {

    firstNameInput: Locator;
    lastNameInput: Locator;
    postalCodeInput: Locator;
    continueButton: Locator;
    cancelButton: Locator;
    errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = this.page.getByPlaceholder('First Name');
        this.lastNameInput = this.page.getByPlaceholder('Last Name');
        this.postalCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });
        this.errorMessage = this.page.locator('[data-test=error]');
    }

    /**
     * Fill the first name field
     * @param firstName - The first name to enter
     */
    async fillFirstName(firstName: string) {
        await this.firstNameInput.click();
        await this.firstNameInput.fill(firstName);
    }

    /**
     * Fill the last name field
     * @param lastName - The last name to enter
     */
    async fillLastName(lastName: string) {
        await this.lastNameInput.click();
        await this.lastNameInput.fill(lastName);
    }

    /**
     * Fill the postal code field
     * @param postalCode - The postal code to enter
     */
    async fillPostalCode(postalCode: string) {
        await this.postalCodeInput.click();
        await this.postalCodeInput.fill(postalCode);
    }

    /**
     * Fill all customer data fields at once
     * @param firstName - The customer's first name
     * @param lastName - The customer's last name
     * @param postalCode - The customer's postal code
     */
    async fillCustomerData(firstName: string, lastName: string, postalCode: string) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillPostalCode(postalCode);
    }

    /**
     * Click the continue button to proceed to the next checkout step
     */
    async clickContinue() {
        await this.continueButton.click();
    }

    /**
     * Click the cancel button to abort checkout
     */
    async clickCancel() {
        await this.cancelButton.click();
    }

    /**
     * Get the error message displayed on the checkout form
     * @returns The error message text content
     */
    async getErrorMessage(): Promise<string | null> {
        return await this.errorMessage.textContent();
    }
}
