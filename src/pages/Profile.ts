import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class Profile extends BasePage {
    constructor(page: Page) {
        super(page, '/panel/profile')
    }
}