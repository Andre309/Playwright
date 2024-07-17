import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

test.describe('Registration form', async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        const signInButton = page.getByRole('button', { name: 'sign in' })
        const modal = page.locator('.modal-content')
        const registrationButton = modal.getByRole('button', { name: 'registration' })

        await signInButton.click()
        await registrationButton.click()

    })

    test('Registration positive test', async ({ page }) => {

        const modal = page.locator('.modal-content')
        const inputName = modal.locator('#signupName')
        const inputLastName = modal.locator('#signupLastName')
        const inputEmail = modal.locator('#signupEmail')
        const inputPassword = modal.locator('#signupPassword')
        const inputReEnterPassword = modal.locator('#signupRepeatPassword')
        const registerButton = modal.getByRole('button', { name: 'Register' })

        await inputName.fill('Jacky')
        await inputLastName.fill('Kiptan')
        await inputEmail.fill('aqa-kiptan@test.com')
        await inputPassword.pressSequentially('1234Qwerty$', { delay: 100 })
        await inputReEnterPassword.pressSequentially('1234Qwerty$')
        await registerButton.click()
    })

    test('Empty fields, negative test 1', async ({ page }) => {
        const modal = page.locator('.modal-content')
        const inputName = modal.locator('#signupName')
        const inputLastName = modal.locator('#signupLastName')
        const inputEmail = modal.locator('#signupEmail')
        const inputPassword = modal.locator('#signupPassword')
        const inputReEnterPassword = modal.locator('#signupRepeatPassword')

        await inputName.click()
        await inputLastName.click()
        await expect.soft(modal.getByText('Name required'), 'Name required').toBeVisible()
        await expect.soft(modal.getByText('Name required'), 'Name required text with red color').toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect.soft(inputName, 'Name field with red border color').toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await inputEmail.click()
        await expect.soft(modal.getByText('Last name required'), 'Last name required').toBeVisible()
        await expect.soft(modal.getByText('Last name required'), 'Last name required text with red color').toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect.soft(inputLastName, 'Last name field with red border color').toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await inputPassword.click()
        await expect.soft(modal.getByText('Email required'), 'Email required').toBeVisible()
        await expect.soft(modal.getByText('Email required'), 'Email required text with red color').toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect.soft(inputEmail, 'Email required field with red border color').toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await inputReEnterPassword.click()
        await expect.soft(modal.getByText('Password required'), 'Password required').toBeVisible()
        await expect.soft(modal.getByText('Password required'), 'Password required text with red color').toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect.soft(inputPassword, 'Password required field with red border color').toHaveCSS('border-color', 'rgb(220, 53, 69)')
        await inputReEnterPassword.blur()
        await expect.soft(modal.getByText('Re-enter password required'), 'Re-enter password required').toBeVisible()
        await expect.soft(modal.getByText('Re-enter password required'), 'Re-enter password required text with red color').toHaveCSS('color', 'rgb(220, 53, 69)')
        await expect.soft(inputReEnterPassword, 'Re-enter password required field with red border color').toHaveCSS('border-color', 'rgb(220, 53, 69)')
    })

    test('Field Name: wrong data & wrong length, negative test 2', async ({ page }) => {
        const modal = page.locator('.modal-content')
        const inputName = modal.locator('#signupName')
        await inputName.fill('8*#John')
        await inputName.blur()
        await expect.soft(modal.getByText('Name is invalid'), 'Name is invalid').toBeVisible()
        await expect.soft(modal.getByText('Name is invalid'), 'Red text: "Name is invalid"').toHaveCSS('color', 'rgb(220, 53, 69)')

        await inputName.clear()
        await inputName.fill('John ')
        await inputName.blur()
        await expect.soft(modal.getByText('Name is invalid'), 'Name is invalid').toBeVisible()
        await expect.soft(modal.getByText('Name is invalid'), 'Red text: "Name is invalid"').toHaveCSS('color', 'rgb(220, 53, 69)')

        await inputName.clear()
        await inputName.fill('J')
        await inputName.blur()
        await expect.soft(modal.getByText('Name has to be from 2 to 20 characters long'), 'Name has to be from 2 to 20 characters long').toBeVisible()
        await expect.soft(modal.getByText('Name has to be from 2 to 20 characters long'), 'Red text: "Name has to be from 2 to 20 characters long"').toHaveCSS('color', 'rgb(220, 53, 69)')

        await inputName.clear()
        await inputName.fill('Johnjohnjohnjohnjohnj')
        await inputName.blur()
        await expect.soft(modal.getByText('Name has to be from 2 to 20 characters long'), 'Name has to be from 2 to 20 characters long').toBeVisible()
        await expect.soft(modal.getByText('Name has to be from 2 to 20 characters long'), 'Red text: "Name has to be from 2 to 20 characters long"').toHaveCSS('color', 'rgb(220, 53, 69)')
    })

    test('Last name: wrong data & wrong length, negative test 3', async ({ page }) => {
        const modal = page.locator('.modal-content')
        const inputLastName = modal.locator('#signupLastName')
        await inputLastName.fill('8*#Kiptan')
        await inputLastName.blur()
        await expect.soft(modal.getByText('Last name is invalid'), 'Last name is invalid').toBeVisible()
        await expect.soft(modal.getByText('Last name is invalid'), 'Red text: "Last name is invalid"').toHaveCSS('color', 'rgb(220, 53, 69)')

        await inputLastName.clear()
        await inputLastName.fill('Kiptan ')
        await inputLastName.blur()
        await expect.soft(modal.getByText('Last name is invalid'), 'Last name is invalid').toBeVisible()
        await expect.soft(modal.getByText('Last name is invalid'), 'Red text: "Last name is invalid"').toHaveCSS('color', 'rgb(220, 53, 69)')

        await inputLastName.clear()
        await inputLastName.fill('K')
        await inputLastName.blur()
        await expect.soft(modal.getByText('Last name has to be from 2 to 20 characters long'), 'Last name has to be from 2 to 20 characters long').toBeVisible()
        await expect.soft(modal.getByText('Last name has to be from 2 to 20 characters long'), 'Red text: "Last name has to be from 2 to 20 characters long"').toHaveCSS('color', 'rgb(220, 53, 69)')

        await inputLastName.clear()
        await inputLastName.fill('KiptanKiptanKiptanKiptan')
        await inputLastName.blur()
        await expect.soft(modal.getByText('Last name has to be from 2 to 20 characters long'), 'Last name has to be from 2 to 20 characters long').toBeVisible()
        await expect.soft(modal.getByText('Last name has to be from 2 to 20 characters long'), 'Red text: "Last name has to be from 2 to 20 characters long"').toHaveCSS('color', 'rgb(220, 53, 69)')
    })

    test('Email: wrong data, negative test 4', async ({ page }) => {
        const modal = page.locator('.modal-content')
        const inputEmail = modal.locator('#signupEmail')
        await inputEmail.fill('aqa-Kiptan.com')
        await inputEmail.blur()
        await expect.soft(modal.getByText('Email is incorrect'), 'Email is incorrect').toBeVisible()
        await expect.soft(modal.getByText('Email is incorrect'), 'Red text: "Email is incorrect"').toHaveCSS('color', 'rgb(220, 53, 69)')

        await inputEmail.clear()
        await inputEmail.fill('aqa-Kiptan@test')
        await inputEmail.blur()
        await expect.soft(modal.getByText('Email is incorrect'), 'Email is incorrect').toBeVisible()
        await expect.soft(modal.getByText('Email is incorrect'), 'Red text: "Email is incorrect"').toHaveCSS('color', 'rgb(220, 53, 69)')
    })

    test('Password: wrong data, negative test 5', async ({ page }) => {
        const modal = page.locator('.modal-content')
        const inputPassword = modal.locator('#signupPassword')
        await inputPassword.fill('qwerty')
        await inputPassword.blur()
        await expect.soft(modal.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'), 'Password < 8 symbols').toBeVisible()
        await expect.soft(modal.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'), 'Red text when Password < 8 symbols').toHaveCSS('color', 'rgb(220, 53, 69)')

        await inputPassword.clear()
        await inputPassword.fill('Qwerty8qwertyqwe')
        await inputPassword.blur()
        await expect.soft(modal.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'), 'Password > 15 symbols').toBeVisible()
        await expect.soft(modal.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'), 'Red text when Password > 15 symbols').toHaveCSS('color', 'rgb(220, 53, 69)')


        await inputPassword.clear()
        await inputPassword.fill('Qwertyqwertyqw')
        await inputPassword.blur()
        await expect.soft(modal.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'), 'Password without integer').toBeVisible()
        await expect.soft(modal.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'), 'Red text when Password without integer').toHaveCSS('color', 'rgb(220, 53, 69)')

        await inputPassword.clear()
        await inputPassword.fill('5wertyqwertyqw')
        await inputPassword.blur()
        await expect.soft(modal.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'), 'Password without capital letter').toBeVisible()
        await expect.soft(modal.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'), 'Red text when Password without capital letter').toHaveCSS('color', 'rgb(220, 53, 69)')
    })

    test('Re-enter password: Passwords do nor match, negative test 6', async ({ page }) => {
        const modal = page.locator('.modal-content')
        const inputPassword = modal.locator('#signupPassword')
        const inputReEnterPassword = modal.locator('#signupRepeatPassword')

        await inputPassword.fill('44QwertyQwerty')
        await inputReEnterPassword.fill('4QwertyQwerty')
        await inputReEnterPassword.blur()
        await expect.soft(modal.getByText('Passwords do not match'), 'Passwords do not match').toBeVisible()
        await expect.soft(modal.getByText('Passwords do not match'), 'Red text when Passwords do not match').toHaveCSS('color', 'rgb(220, 53, 69)')
    })

    test('Register button is disabled, negative test 7', async ({ page }) => {
        const modal = page.locator('.modal-content')
        const inputName = modal.locator('#signupName')
        const inputLastName = modal.locator('#signupLastName')
        const inputEmail = modal.locator('#signupEmail')
        const inputPassword = modal.locator('#signupPassword')
        const inputReEnterPassword = modal.locator('#signupRepeatPassword')
        const registerButton = modal.getByRole('button', { name: 'Register' })

        await inputName.fill('Jecky')
        await inputLastName.fill('Kiptan')
        await inputEmail.click()
        await inputPassword.fill('44QwertyQwerty')
        await inputReEnterPassword.fill('44QwertyQwerty')
        await expect.soft(registerButton).toBeDisabled()
    })
})