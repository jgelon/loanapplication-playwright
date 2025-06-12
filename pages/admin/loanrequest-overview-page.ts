import { type Page } from '@playwright/test';

export class AdminLoanRequestOverviewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page
  }

  async openRequest(requestId) {
    await this.page.getByRole('link', { name: requestId }).click();
  }

  async openLastRequest() {
    await this.page.locator('.mat-column-id').locator('a').last().click()
  }
}