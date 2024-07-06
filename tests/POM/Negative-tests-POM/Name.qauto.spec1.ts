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

// 1. Обов'язкове поле 'Name'

  await homePage.modalNegative.RequiredName('');
  await lastNameInput.focus();
  await expect(page.getByText('Name required')).toBeVisible();

  // Перевірка CSS властивості та стану кнопки

  await expect(firstNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // 2. Невірні дані в полі "name"

  await homePage.modalNegative.InvalidName('invalid_name_123');
  await lastNameInput.focus();
  await expect(page.getByText('Name is invalid')).toBeVisible();
  await expect(firstNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // 3. Надто коротке ім'я

  await homePage.modalNegative.ShortName('a');
  await lastNameInput.focus();
  await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
  await expect(firstNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // 4. Надто довге ім'я

  await homePage.modalNegative.LongName('a'.repeat(21));
  await lastNameInput.focus();
  await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
  await expect(firstNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // 5. Перевірка англійських символів та ігнорування пробілів

  await homePage.modalNegative.IgnoreSpaceName('  Elian  ');
  await lastNameInput.focus();
  const trimmedName = await firstNameInput.inputValue();
  expect(trim(trimmedName)).toBe('Elian');
});
