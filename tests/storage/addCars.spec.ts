import { test, expect } from '@playwright/test';
import { GaragePage } from '../../src/pages/GaragePage';

test('Check storage', (async ({ page }) => {
    const garagePage = new GaragePage(page)
    await garagePage.navigate()
    await expect(page.getByRole('button', { name: 'Add car' })).toBeVisible()
    // await page.pause()
}))