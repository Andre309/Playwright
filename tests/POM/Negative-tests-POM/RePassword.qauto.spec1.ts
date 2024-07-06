import { test, expect } from '@playwright/test';
import { HomePage } from '../HomePage';

test('registration', {tag: '@regression'}, async ({ page }) => {
  const homePage = new HomePage(page);

  const lastNameInput = homePage.modalNegative.lastNameInput;
  const passwordInput = homePage.modalNegative.passwordInput;
  const reEnterPasswordInput = homePage.modalNegative.reEnterPasswordInput;
  const submitBtn = homePage.modalNegative.submitBtn;

  await homePage.navigate();

  await homePage.header.clickSignIn();
  await homePage.modalNegative.clickRegister();

// 1. Повторний пароль обов'язковий

  await homePage.modalNegative.RequiredRePass('');
  await lastNameInput.focus();
  await expect(page.getByText('Re-enter password required')).toBeVisible();
  await expect(reEnterPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

// 2. Паролі не співпадають

  await passwordInput.fill('Password15');
  await homePage.modalNegative.RePassNotMatch('Password16');
  await lastNameInput.focus();
  await expect(page.getByText('Passwords do not match')).toBeVisible();
  await expect(reEnterPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();
});
