import { test, expect } from '@playwright/test';
import { HomePage } from '../HomePage';

test('registration', {tag: '@regression'}, async ({ page }) => {
  const homePage = new HomePage(page);

  const lastNameInput = homePage.modal.lastNameInput;
  const passwordInput = homePage.modal.passwordInput;
  const submitBtn = homePage.modal.submitBtn;

  await homePage.navigate();

  await homePage.header.clickSignIn();
  await homePage.modal.clickRegister();

// 1. Надто короткий пароль

  await homePage.modal.inputPassword('q');
  await lastNameInput.focus();
  await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
  await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

// 2. Надто довгий пароль

  await homePage.modal.inputPassword('q'.repeat(16));
  await lastNameInput.focus();
  await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
  await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

// 3. Недопустимі символи (пароль без цифр)

  await homePage.modal.inputPassword('Password');
  await lastNameInput.focus();
  await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
  await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

// 4. Недопустимі символи (Пароль без великих літер)


await homePage.modal.inputPassword('password188');
await lastNameInput.focus();
await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
await expect(submitBtn).toBeDisabled();

// 5. Недопустимі символи (Пароль без малих літер)


  await homePage.modal.inputPassword('PASSWORD15');
  await lastNameInput.focus();
  await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
  await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();
});
