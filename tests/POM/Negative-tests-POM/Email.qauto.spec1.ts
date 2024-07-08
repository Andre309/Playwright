import { test, expect } from '@playwright/test';
import { HomePage } from '../HomePage';

test('registration', {tag: '@regression'}, async ({ page }) => {
  const homePage = new HomePage(page);

  const lastNameInput = homePage.modal.lastNameInput;
  const emailInput = homePage.modal.emailInput;
  const submitBtn = homePage.modal.submitBtn;

  await homePage.navigate();

  await homePage.header.clickSignIn();
  await homePage.modal.clickRegister();

// 1. Обов'язкове поле 'Email'

  await homePage.modal.inputEmail('');
  await lastNameInput.focus();
  await expect(page.getByText('Email required')).toBeVisible();
  await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // 2. Невірні дані в полі "Email"

  await homePage.modal.inputEmail('aqa-Andrij.kibishgmail.com');
  await lastNameInput.focus();
  await expect(page.getByText('Email is incorrect')).toBeVisible();
  await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();
});
