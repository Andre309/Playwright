import { test, expect } from '@playwright/test';
import { HomePage } from '../HomePage';

test('registration', {tag: '@regression'}, async ({ page }) => {
  const homePage = new HomePage(page);

  const lastNameInput = homePage.modal.lastNameInput;
  const passwordInput = homePage.modal.passwordInput;
  const reEnterPasswordInput = homePage.modal.reEnterPasswordInput;
  const submitBtn = homePage.modal.submitBtn;

  await homePage.navigate();

  await homePage.header.clickSignIn();
  await homePage.modal.clickRegister();

// 1. Повторний пароль обов'язковий

  await homePage.modal.inputRePassword('');
  await lastNameInput.focus();
  await expect(page.getByText('Re-enter password required')).toBeVisible();
  await expect(reEnterPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

// 2. Паролі не співпадають

  await passwordInput.fill('Password15');
  await homePage.modal.inputRePassword('Password16');
  await lastNameInput.focus();
  await expect(page.getByText('Passwords do not match')).toBeVisible();
  await expect(reEnterPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();
});
