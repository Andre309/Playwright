import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { RegistrationForm } from './RegistrationForm';

export class HomePage extends BasePage {

    protected readonly _header: Locator
    protected readonly _signInButton: Locator
    protected readonly _modal: Locator
    protected readonly _registrationButton: Locator
    protected readonly _emailInput: Locator
    protected readonly _passwordInput: Locator
    protected readonly _loginButton: Locator

    constructor(page: Page) {
        super(page, '/')
        this._header = this._page.locator('.header')
        this._signInButton = this._header.getByRole('button', { name: 'Sign In' })
        this._modal = this._page.locator('.modal-content')
        this._registrationButton = this._modal.getByRole('button', { name: 'Registration' })
        this._emailInput = this._modal.locator('#signinEmail')
        this._passwordInput = this._modal.locator('#signinPassword')
        this._loginButton = this._modal.getByRole('button', { name: 'Login' })
    }

    async openRegistrationForm() {
        await this._signInButton.click()
        await this._registrationButton.click()
        return new RegistrationForm(this._modal)
    }

    async loginAsUser(login: string, pass: string) {
        await this._signInButton.click()
        await this._emailInput.fill(login)
        await this._passwordInput.fill(pass)
        await this._loginButton.click()
    }
}