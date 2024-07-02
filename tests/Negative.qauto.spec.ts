import { test, expect } from '@playwright/test';

// Функція для обрізання пробілів з початку і кінця рядка
function trim(str) {
  return str.trim();
}

test('registration', {tag: '@regression'}, async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  const header = page.locator('.header')
  const signInBtn = header.getByRole('button', {name: 'Sign In'})
  const modal = page.locator('.modal-content')
  const registerBtn = modal.getByRole('button', {name: 'Registration'}) 
  const firstNameInput = modal.locator('#signupName')
  const lastNameInput = modal.locator('#signupLastName')
  const emailInput = modal.locator('input[name="email"]')
  const submitBtn = modal.getByRole('button', { name: 'Register' });
  const passwordInput = modal.locator('#signupPassword')
  const reEnterPasswordInput = modal.locator('#signupRepeatPassword')


  await signInBtn.click()
  await registerBtn.click()

  // Тест-кейс 1: Поле "Name"

  // Обов'язкове поле 'Name'

  await firstNameInput.fill('');
  await lastNameInput.focus();
  await expect(page.getByText('Name required')).toBeVisible();
  await expect(firstNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // Невірні дані в полі "name"
  await firstNameInput.fill('invalid_name_123');
  await lastNameInput.focus();
  await expect(page.getByText('Name is invalid')).toBeVisible();
  await expect(firstNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // Надто коротке ім'я
  await firstNameInput.fill('a');
  await lastNameInput.focus();
  await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
  await expect(firstNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // Надто довге ім'я
  await firstNameInput.fill('a'.repeat(21));
  await lastNameInput.focus();
  await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
  await expect(firstNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // Перевірка англійських символів та ігнорування пробілів
  await firstNameInput.fill('  Elian  ');
  await lastNameInput.focus();
  const trimmedName = await firstNameInput.inputValue();
  expect(trim(trimmedName)).toBe('Elian');

  // Тест-кейс 2: Поле "Last Name"

  // Обов'язкове поле 'Last Name'

  await lastNameInput.fill('')
  await firstNameInput.focus();
  await expect(page.getByText('Last name required')).toBeVisible();
  await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // Невірні дані в полі Last name

  await lastNameInput.fill('invalid_last_name_123');
  await firstNameInput.focus();
  await expect(page.getByText('Last name is invalid')).toBeVisible();
  await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // Надто коротке прізвище

  await lastNameInput.fill('a');
  await firstNameInput.focus();
  await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
  await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // Надто довге прізвище

  await lastNameInput.fill('a'.repeat(21));
  await firstNameInput.focus();
  await expect(page.getByText('last name has to be from 2 to 20 characters long')).toBeVisible();
  await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // Перевірка англійських символів та ігнорування пробілів

  await lastNameInput.fill('  Space  ');
  await firstNameInput.focus();
  const trimmedLastName = await lastNameInput.inputValue();
  expect(trim(trimmedLastName)).toBe('Space');

  // Тест-кейс 3: Поле "Email"

  // Невірні дані в полі Email

  await emailInput.fill('aqa-Andrij.kibishgmail.com');
  await firstNameInput.focus();
  await expect(page.getByText('Email is incorrect')).toBeVisible();
  await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // For empty field - email required

  await emailInput.fill('')
  await firstNameInput.focus();
  await expect(page.getByText('Email required')).toBeVisible();
  await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // Тест-кейс 4: Поле "Пароль"

  // Надто короткий пароль

  await passwordInput.fill('q');
  await firstNameInput.focus();
  await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
  await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // Надто довгий пароль

  await passwordInput.fill('q'.repeat(16));
  await firstNameInput.focus();
  await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
  await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // Недопустимі символи (пароль без цифр)

  await passwordInput.fill('Password'); 
  await firstNameInput.focus();
  await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
  await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // Недопустимі символи (Пароль без великих літер)

  await passwordInput.fill('password15'); 
  await firstNameInput.focus();
  await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
  await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // Недопустимі символи (Пароль без малих літер)

  await passwordInput.fill('PASSWORD15'); 
  await firstNameInput.focus();
  await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
  await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // Тест-кейс 5: Поле "Повторний Пароль"

  // Повторний пароль обов'язковий

  await reEnterPasswordInput.fill('')
  await firstNameInput.focus();
  await expect(page.getByText('Re-enter password required')).toBeVisible();
  await expect(reEnterPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();

  // Паролі не співпадають

  await passwordInput.fill('Password15');
  await reEnterPasswordInput.fill('Password16');
  await firstNameInput.focus();
  await expect(page.getByText('Passwords do not match')).toBeVisible();
  await expect(reEnterPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  await expect(submitBtn).toBeDisabled();
});


