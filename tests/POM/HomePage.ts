import { Page } from '@playwright/test';
import { Header } from './Header';
import { Modal } from './Modal';
import { ModalNegative } from './ModalNegative';

export class HomePage {
  readonly page: Page;
  readonly header: Header;
  readonly modal: Modal;
  readonly modalNegative: ModalNegative;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.modal = new Modal(page);
    this.modalNegative = new ModalNegative(page);
  }

  async navigate() {
    await this.page.goto('/');
  }
}
