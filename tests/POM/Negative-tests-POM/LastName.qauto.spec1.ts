import { test, expect } from '@playwright/test';
import { HomePage } from '../HomePage';

// Функція для обрізання пробілів з початку і кінця рядка
function trim(str: string): string {
  return str.trim();
}

test('registration', {tag: '@regression'}, async ({ page }) => {
  const homePage = new HomePage(page);

  const firstNameInput = homePage.modalNegative.firstNameInput;
  const lastNameInput = homePage.modalNegative.lastNameInput;
  const submitBtn = homePage.modalNegative.submitBtn;

  await homePage.navigate();

  await homePage.header.clickSignIn();
  await homePage.modalNegative.clickRegister();

// 1. Обов'язкове поле 'Last Name'

  await homePage.modalNegative.RequiredLastName('');
  await firstNameInput.focus();
  await expect(page.getByText('Last name required')).toBeVisible();
  await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // 2. Невірні дані в полі "Last Name"

  await homePage.modalNegative.InvalidLastName('invalid_last_name_123');
  await firstNameInput.focus();
  await expect(page.getByText('Last name is invalid')).toBeVisible();
  await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // 3. Надто коротке прізвище

  await homePage.modalNegative.ShortLastName('a');
  await firstNameInput.focus();
  await expect(page.getByText('Last Name has to be from 2 to 20 characters long')).toBeVisible();
  await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // 4. Надто довге ім'я

  await homePage.modalNegative.LongLastName('a'.repeat(21));
  await firstNameInput.focus();
  await expect(page.getByText('Last Name has to be from 2 to 20 characters long')).toBeVisible();
  await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // 5. Перевірка англійських символів та ігнорування пробілів

  await homePage.modalNegative.IgnoreSpaceLastName('  Space  ');
  await firstNameInput.focus();
  const trimmedName = await lastNameInput.inputValue();
  expect(trim(trimmedName)).toBe('Space');
});
