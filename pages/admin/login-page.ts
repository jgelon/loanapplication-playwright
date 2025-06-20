import { type Page, Locator } from '@playwright/test';
import { step } from '../../base';

export class AdminLoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }

    async superadminLogin() {
        await this.login('superadmin', 'superadmin')
    }
    async adminLogin() {
        await this.login('admin', 'admin')
    }
    async readerLogin() {
        await this.login('reader', 'reader')
    }

    @step("login with username and password")
    async login(username: string, password: string) {
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    async goto() {
        await this.page.getByRole('link', { name: 'Show Loan Requests' }).click();
    }
}