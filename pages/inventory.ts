import { expect, type Locator, type Page } from '@playwright/test';
import { basepage } from './basepage';

/**
 * Inventory page object for managing product catalog and shopping operations
 */
export class InventoryPage extends basepage {

    menuButtonOpen: Locator;
    menuButtonClose: Locator;
    inventoryList: Locator;
    addToCartButton: Locator;
    cartLink: Locator;
    errorMessage: Locator;
    inventoryItemName: Locator;
    reset: Locator;

    constructor(page: Page) {
        super(page);
        this.menuButtonOpen = this.page.getByRole('button', { name: 'Open Menu' });
        this.menuButtonClose = this.page.getByRole('button', { name: 'Close Menu' });
        this.inventoryList = this.page.locator("[data-test=inventory-item-description]");
        this.addToCartButton = this.page.locator("[data-test*='add-to-cart']");
        this.cartLink = this.page.locator("[data-test=shopping-cart-link]");
        this.errorMessage = this.page.locator('#error');
        this.inventoryItemName = this.page.locator("[data-test=inventory-item-name]");
        this.reset = this.page.locator("[data-test=reset-sidebar-link]");
    }

    /**
     * Opens the menu
     */
    async OpenMenu() {
        await this.menuButtonOpen.click();
    }

    /**
     * Closes the menu
     */
    async CloseMenu() {
        await this.menuButtonClose.click();
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
     * @param count - Count of items to add
     */
    async AddMultipleItems(count: number) {
        for (let i = 0; i < count; i++) {
            await this.addToCartButton.nth(i).click();
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

    /**
     * Click on the reset state button
     */
    async ResetState(){
        await this.OpenMenu();
        await this.reset.click();
        await this.CloseMenu();
    }
}