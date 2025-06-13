import { type Page } from '@playwright/test';
import { type CommentText } from './../../models/Comment'
import { step } from '../../base';

export class AdminLoanRequestPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }

    @step("approve loan request")
    async approve() {
        await this.page.getByRole('button', { name: 'Approve' }).click()
    }

    @step("decline loan request")
    async decline() {
        await this.page.getByRole('button', { name: 'Decline' }).click()
    }

    @step("comment on loan request")
    async comment(comment: string) {
        await this.page.getByRole('textbox').highlight()
        await this.page.getByRole('textbox').fill('test comment')
        await this.page.getByRole('button', { name: 'Add comment' }).click()
    }

    async listComments() : Promise<CommentText[]>{
        let list = Array<CommentText>()
        var items = await this.page.locator("app-requestcomments").locator('.card').all()
        for(const item of items) {
            let comment : CommentText = {
                id: await item.getByRole("heading").innerText(),
                text: await item.locator(".card-body").innerText()
            }
            list.push(comment);            
        }
        return list
    }
}