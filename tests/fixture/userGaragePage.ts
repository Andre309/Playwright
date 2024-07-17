import { loggedPageTest as test } from "../../Fixtures/fixtures";

test('log user info', async ({ userGaragePage }) => {
    await userGaragePage.goto('/')
    // await userGaragePage.pause()
})