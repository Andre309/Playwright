import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { Profile } from '../../src/pages/Profile';

const USER = process.env.APP_USER_EMAIL!
const PASS = process.env.APP_USER_PASS!

test('Mocked Profile', async ({ page }) => {
    const testData = {
        "status": "ok",
        "data": {
            "userId": 128992,
            "photoFilename": "default-user.png",
            "name": "Andrii",
            "lastName": "Kibysh"
        }
    }

    await page.route('**/api/users/profile', route => route.fulfill({
        status: 200,
        body: JSON.stringify(testData)
    }))
    const homePage = new HomePage(page)
    await homePage.navigate()
    await homePage.loginAsUser(USER, PASS)
    await page.getByRole('button', { name: 'Add car' }).waitFor()

    const profilePage = new Profile(page)
    await profilePage.navigate()
    await expect(page.getByText('Andrii Kibysh')).toBeVisible()
    await page.pause()
})