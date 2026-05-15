import { expect, type Locator, type Page } from '@playwright/test';
import { basepage } from './basepage';

/**
 * Login page object for handling user authentication
 */
export class LoginPage extends basepage {

    submitButton: Locator;
    username: Locator;
    password: Locator;
    errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.submitButton = this.page.getByRole('button', { name: 'Login' });
        this.username = this.page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.errorMessage = this.page.locator('#error');
    }

    /**
     * Click the login submit button
     */
    async ClicksubmitButton() {
        await this.submitButton.click();
    }

    /**
     * Enter username into the username field
     * @param text - The username to enter
     */
    async sendTextUser(text: string) {
        await this.username.click();
        await this.username.fill(text);
    }

    /**
     * Enter password into the password field
     * @param text - The password to enter
     */
    async sendTextPass(text: string) {
        await this.password.click();
        await this.password.fill(text);
    }

    /**
     * Get the error message displayed on the login page
     * @returns The error message text content
     */
    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

}