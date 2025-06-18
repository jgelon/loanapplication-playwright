import { type Page, expect } from '@playwright/test';
import { Person } from '../models/Person';
import { formatDate, step } from '../base';

export class LoanRequestPage {
    readonly page: Page;
    person: Person | undefined;

    constructor(page: Page) {
        this.page = page
    }

    async goto() {
        await this.page.getByRole('link', { name: 'Request New Loan', exact: true }).click();
    }

    @step("click next")
    async next() {
        await this.page.getByRole('button', { name: 'Next' }).click();
    }

    @step("select loan type and amount")
    async selectLoan(loantype: string, amount: number) {
        await this.page.getByText(loantype).click();
        await this.page.getByPlaceholder('Amount').fill(amount.toString());
    }

    @step("acknowledge knowledge")
    async acknowledgeKnowledge() {
        await this.page.getByText('I have knowledge of and').click();
    }

    @step("fill details for person")
    async fillDetails(person: Person) {
        await this.page.locator('select[formcontrolname="gender"]').selectOption(person.gender.toString());
        await this.page.getByRole('textbox', { name: 'Firstname' }).fill(person.firstname);
        await this.page.getByRole('textbox', { name: 'Lastname' }).fill(person.lastname);
        await this.page.getByPlaceholder('Date of birth').pressSequentially(formatDate(person.dob).replace(/\//g, ""));
        await this.page.getByRole('textbox', { name: 'Address' }).fill(person.address);
        await this.page.getByRole('textbox', { name: 'Zipcode' }).fill(person.zipcode);
        await this.page.getByRole('textbox', { name: 'City' }).fill(person.city);
        await this.page.locator('select[formcontrolname="maritalStatus"]').selectOption(person.maritalstatus.toString());
        await this.page.getByPlaceholder('Income').fill(person.income.toString());
        await this.page.locator('select[formcontrolname="incometype"]').selectOption(person.incometype.toString());
    }

    @step("submit the loan request")
    async requestTheLoan() {
        await this.page.getByRole('button', { name: 'Request the loan' }).click();
    }

    @step("get loan request id")
    async getLoanId(): Promise<number> {
        const confirmationTextElement = this.page.getByText('Your request has been');

        await expect(confirmationTextElement).toBeVisible();
        await expect(confirmationTextElement).toContainText(/Your request has been submitted and is filled under #\d+/);

        await expect(this.page).toHaveScreenshot("request-created.png",
            {
                mask: [this.page.locator("#requestId")]
            }
        );

        const number = await this.page.locator("#requestId").textContent();
        return Number(number)
    }
}