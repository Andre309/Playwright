import { Page } from '@playwright/test';
import { Header } from './Header';
import { Modal } from './Modal';

export class HomePage {
  readonly page: Page;
  readonly header: Header;
  readonly modal: Modal;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.modal = new Modal(page);
  }

  async navigate() {
    await this.page.goto('/');
  }
}
