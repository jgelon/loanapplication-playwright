import { test as base } from "@playwright/test"
import { LoanRequestOverviewPage } from "./pages/admin/loanrequest-overview-page"
import { LoginPage } from "./pages/admin/login-page"
import { LoanRequestPage } from "./pages/admin/loanrequest-page"

type MyFixtures = {
    loginPage: LoginPage
    loanRequestOverviewPage: LoanRequestOverviewPage
    loanRequestPage: LoanRequestPage
}

export const test = base.extend<MyFixtures>({
    page: async({page}, use) => {
        page.goto('https://loanapplication.gmie.nl')
        await use(page)
        //
    },
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page))
    },
    loanRequestOverviewPage: async ({page}, use) => {
        await use(new LoanRequestOverviewPage(page))
    },
    loanRequestPage: async ({page}, use) => {
        await use(new LoanRequestPage(page))
    },
})

export { expect } from "@playwright/test"