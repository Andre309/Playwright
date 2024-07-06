import { Locator, Page } from '@playwright/test';

export class Header {
  readonly signInBtn: Locator;

  constructor(page: Page) {
    this.signInBtn = page.locator('.header').getByRole('button', { name: 'Sign In' });
  }

  async clickSignIn() {
    await this.signInBtn.click();
  }
}
