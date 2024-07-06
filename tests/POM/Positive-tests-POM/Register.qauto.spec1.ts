import { test, expect } from '@playwright/test';
import { HomePage } from '../HomePage';

test('registration', {tag: '@regression'}, async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigate();

  await homePage.header.clickSignIn();
  await homePage.modal.clickRegister();
  await homePage.modal.fillRegistrationForm('Elian', 'Space', 'andrij.kufdfdsfh@gmail.com', 'Passdfdf65');
  await homePage.modal.submit();

  await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
  await expect(page.getByText(' My profile ')).toBeVisible();
});
