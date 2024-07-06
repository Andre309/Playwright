import { Locator, Page } from '@playwright/test';

// Функція для обрізання пробілів з початку і кінця рядка
function trim(str: string): string {
  return str.trim();
}

export class ModalNegative {
  readonly registerBtn: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly reEnterPasswordInput: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    const modalNegative = page.locator('.modal-content');
    this.registerBtn = modalNegative.getByRole('button', { name: 'Registration' });
    this.firstNameInput = modalNegative.locator('#signupName');
    this.lastNameInput = modalNegative.locator('#signupLastName');
    this.emailInput = modalNegative.locator('#signupEmail');
    this.passwordInput = modalNegative.locator('#signupPassword');
    this.reEnterPasswordInput = modalNegative.locator('#signupRepeatPassword');
    this.submitBtn = modalNegative.getByRole('button', { name: 'Register' });
  }

  async clickRegister() {
    await this.registerBtn.click();
  }

// Тест-кейс 1 - поле Name

async RequiredName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

async InvalidName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

async ShortName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

async LongName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

async IgnoreSpaceName(firstName: string) {
    await this.firstNameInput.fill(trim(firstName));
  }  

  // Тест-кейс 2 - поле Last Name

  async RequiredLastName(LastName: string) {
    await this.lastNameInput.fill(LastName);
  } 

  async InvalidLastName(LastName: string) {
    await this.lastNameInput.fill(LastName);
  }

  async ShortLastName(LastName: string) {
    await this.lastNameInput.fill(LastName);
  }  

  async LongLastName(LastName: string) {
    await this.lastNameInput.fill(LastName);
  }  

  async IgnoreSpaceLastName(LastName: string) {
    await this.lastNameInput.fill(trim(LastName));
  }  

  // Тест-кейс 2 - поле Email

  async InvalidEmail(Email: string) {
    await this.emailInput.fill(Email);
  }   

  async RequiredEmail(Email: string) {
    await this.emailInput.fill(Email);
  }  

  // Тест-кейс 3 - поле Password

  async ShortPassword(Password: string) {
    await this.passwordInput.fill(Password);
  }

  async LongPassword(Password: string) {
    await this.passwordInput.fill(Password);
  }

  async PassWithoutDigits(Password: string) {
    await this.passwordInput.fill(Password);
  }

  async PassWithoutUpperLetters(Password: string) {
    await this.passwordInput.fill(Password);
  }

  async PassWithoutLowerLetters(Password: string) {
    await this.passwordInput.fill(Password);
  }

  // Тест-кейс 4 - поле "Повторний пароль"

  async RequiredRePass(reEnterPasswordInput: string) {
    await this.reEnterPasswordInput.fill(reEnterPasswordInput);
  }

  async RePassNotMatch(reEnterPasswordInput: string) {
    await this.reEnterPasswordInput.fill(reEnterPasswordInput);
  }

  async submit() {
    await this.submitBtn.click();
  }

}
