import { test, expect } from '@playwright/test';

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

  // Заповнення полів валідними значеннями
  
  await firstNameInput.fill('Elian');
  await lastNameInput.fill('Space');
  await emailInput.fill('aqa-andrij.kifsh@gmail.com');
  await passwordInput.fill('Password457');
  await reEnterPasswordInput.fill('Password457');
  await submitBtn.click();

  await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
  await expect(page.getByText(' My profile ')).toBeVisible();
});


