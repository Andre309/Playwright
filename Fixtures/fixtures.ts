import { Page, test } from '@playwright/test';

export const loggedPageTest = test.extend<{ userGaragePage: Page }>({
    userGaragePage: async ({ browser }, use) => {
        const pageFromStorage = await browser.newPage({ storageState: 'session-storage.json' })
        await use(pageFromStorage)
    }
})