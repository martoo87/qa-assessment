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
    menuItems: Locator;
    filters: Locator;
    inventoryItemPrice: Locator;
    inventoryItemImage: Locator;
    inventoryItemDescription: Locator;
		
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
        this.menuItems = this.page.locator("[data-test*='sidebar-link']");
        this.filters = this.page.locator("[data-test='product-sort-container']");
        this.inventoryItemPrice = this.page.locator("[data-test=inventory-item-price]");
        this.inventoryItemImage = this.page.locator("[data-test=inventory-item-img] img");
        this.inventoryItemDescription = this.page.locator("[data-test*=-title-link]");
    }

    async clickFiltersOptions(index:number) {
        await this.filters.click();
        await this.filters.selectOption({index});
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

    async getMenuItemsCount(): Promise<number> {
        return await this.menuItems.count();
    }

    async getTextMenuItem(index: number): Promise<string | null> {
        return await this.menuItems.nth(index).textContent();
    }

    /**
     * Get the description of an item by index
     * @param index - The index of the item
     * @returns The item description text
     */
    async GetItemDescription(index: number): Promise<string> {
        const description = await this.inventoryItemDescription.nth(index).textContent();
        return description?.trim() || '';
    }

    /**
     * Get descriptions of all items on the page
     * @returns Array of all item descriptions
     */
    async GetAllItemDescriptions(): Promise<string[]> {
        const descriptions: string[] = [];
        const count = await this.inventoryItemDescription.count();
        for (let i = 0; i < count; i++) {
            const description = await this.inventoryItemDescription.nth(i).textContent();
            descriptions.push(description?.trim() || '');
        }
        return descriptions;
    }

    /**
     * Get the image URL of an item by index
     * @param index - The index of the item
     * @returns The image source URL
     */
    async GetItemImageUrl(index: number): Promise<string | null> {
        const imageSrc = await this.inventoryItemImage.nth(index).getAttribute('src');
        return imageSrc;
    }

    /**
     * Get image URLs of all items on the page
     * @returns Array of all item image URLs
     */
    async GetAllItemImages(): Promise<(string | null)[]> {
        const images: (string | null)[] = [];
        const count = await this.inventoryItemImage.count();
        for (let i = 0; i < count; i++) {
            const imageSrc = await this.inventoryItemImage.nth(i).getAttribute('src');
            images.push(imageSrc);
        }
        return images;
    }

    /**
     * Get the name of an item by index
     * @param index - The index of the item
     * @returns The item name text
     */
    async GetItemName(index: number): Promise<string> {
        const name = await this.inventoryItemName.nth(index).textContent();
        return name?.trim() || '';
    }

    /**
     * Get names of all items on the page
     * @returns Array of all item names
     */
    async GetAllItemNames(): Promise<string[]> {
        const names: string[] = [];
        const count = await this.inventoryItemName.count();
        for (let i = 0; i < count; i++) {
            const name = await this.inventoryItemName.nth(i).textContent();
            names.push(name?.trim() || '');
        }
        return names;
    }

    /**
     * Get the price of an item by index
     * @param index - The index of the item
     * @returns The item price text
     */
    async GetItemPrice(index: number): Promise<string> {
        const price = await this.inventoryItemPrice.nth(index).textContent();
        return price?.trim() || '';
    }

    /**
     * Get prices of all items on the page
     * @returns Array of all item prices
     */
    async GetAllItemPrices(): Promise<number[]> {
        const prices: number[] = [];
        const count = await this.inventoryItemPrice.count();
        for (let i = 0; i < count; i++) {
            const price = await this.inventoryItemPrice.nth(i).textContent();
            prices.push(parseFloat(price?.trim().substring(1) || '0'));
        }
        return prices;
    }

}