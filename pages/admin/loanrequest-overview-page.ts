import { type Page } from '@playwright/test';
import { step } from '../../base';

export class AdminLoanRequestOverviewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page
  }

  @step("Open specific request")
  async openRequest(requestId: string) {
    await this.page.getByRole('link', { name: requestId }).click();
  }

  @step("Open last request")
  async openLastRequest() {
    await this.page.locator('.mat-column-id').locator('a').last().click()
  }
}