import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class GaragePage extends BasePage {
    private readonly _addCarBtn: Locator

    constructor(page: Page) {
        super(page, '/panel/garage')
        this._addCarBtn = page.getByRole('button', { name: 'Add car' })
    }
}