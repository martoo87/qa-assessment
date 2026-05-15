import { expect, type Locator, type Page } from '@playwright/test';
import { basepage } from './basepage';

/**
 * Inventory page object for managing product catalog and shopping operations
 */
export class InventoryPage extends basepage {

    menuButton: Locator;
    inventoryList: Locator;
    addToCartButton: Locator;
    cartLink: Locator;
    errorMessage: Locator;
    inventoryItemName: Locator;

    constructor(page: Page) {
        super(page);
        this.menuButton = this.page.getByRole('button', { name: 'Open Menu' });
        this.inventoryList = this.page.locator("[data-test=inventory-item-description]");
        this.addToCartButton = this.page.locator("[data-test*='add-to-cart']");
        this.cartLink = this.page.locator("[data-test=shopping-cart-link]");
        this.errorMessage = this.page.locator('#error');
        this.inventoryItemName = this.page.locator("[data-test=inventory-item-name]");
    }

    /**
     * Opens the menu
     */
    async ClickMenu() {
        await this.menuButton.click();
    }

    /**
     * Add a single item to the cart by index
     * @param index - The index of the item in the inventory list
     */
    async AddOneItem(index: number) {
        await this.addToCartButton.nth(index).click();
    }

    /**
     * Add multiple items to the cart
     * @param indices - Array of indices of items to add
     */
    async AddMultipleItems(indexs: number[]) {
        for (const index of indexs) {
            await this.addToCartButton.nth(index).click();
        }
    }

    /**
     * Click on an item to view its details
     * @param index - The index of the item to click
     */
    async ClickOnItem(index: number) {
        await this.inventoryItemName.nth(index).click();
    }

    /**
     * Click on the cart to go to purchase details/cart page
     */
    async GoToCart() {
        await this.cartLink.click();
    }
}