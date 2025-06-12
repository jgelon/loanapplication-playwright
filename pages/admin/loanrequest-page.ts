import { type Page } from '@playwright/test';
import { type CommentText } from './../../models/Comment'

export class AdminLoanRequestPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }

    async approve() {
        await this.page.getByRole('button', { name: 'Approve' }).click()
    }

    async decline() {
        await this.page.getByRole('button', { name: 'Decline' }).click()
    }

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