import { Locator, Page } from '@playwright/test';

export class Modal {
  readonly registerBtn: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly reEnterPasswordInput: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    const modal = page.locator('.modal-content');
    this.registerBtn = modal.getByRole('button', { name: 'Registration' });
    this.firstNameInput = modal.locator('#signupName');
    this.lastNameInput = modal.locator('#signupLastName');
    this.emailInput = modal.locator('#signupEmail');
    this.passwordInput = modal.locator('#signupPassword');
    this.reEnterPasswordInput = modal.locator('#signupRepeatPassword');
    this.submitBtn = modal.getByRole('button', { name: 'Register' });
  }

  async clickRegister() {
    await this.registerBtn.click();
  }

  //Заповнення полів валідними даними

  async fillRegistrationForm(firstName: string, lastName: string, email: string, password: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.reEnterPasswordInput.fill(password);
  }

  inputFirstName(value: string){
    return this.firstNameInput.fill(value)
  }

  inputLastName(value: string){
    return this.lastNameInput.fill(value)
  }

  inputEmail(value: string){
    return this.emailInput.fill(value)
  }

  inputPassword(value: string){
    return this.passwordInput.fill(value)
  }

  inputRePassword(value: string){
    return this.reEnterPasswordInput.fill(value)
  }

  async submit() {
    await this.submitBtn.click();
  }
}
