import { Locator, Page } from '@playwright/test';

export class RegistrationForm {
    private readonly _modal: Locator
    private readonly _inputName: Locator
    private readonly _inputLastName: Locator
    private readonly _inputEmail: Locator
    private readonly _inputPassword: Locator
    private readonly _inputReEnterPassword: Locator
    private readonly _registerButton: Locator

    constructor(modal: Locator) {
        this._modal = modal
        this._inputName = this._modal.locator('#signupName')
        this._inputLastName = this._modal.locator('#signupLastName')
        this._inputEmail = this._modal.locator('#signupEmail')
        this._inputPassword = this._modal.locator('#signupPassword')
        this._inputReEnterPassword = this._modal.locator('#signupRepeatPassword')
        this._registerButton = this._modal.getByRole('button', { name: 'Register' })
    }

    get modal() {
        return this._modal
    }

    get inputName() {
        return this._inputName
    }

    get inputLastName() {
        return this._inputLastName
    }

    get inputEmail() {
        return this._inputEmail
    }

    get inputPassword() {
        return this._inputPassword
    }

    get inputReEnterPassword() {
        return this._inputReEnterPassword
    }

    get registerButton() {
        return this._registerButton
    }
}