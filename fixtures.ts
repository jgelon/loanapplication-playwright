import { test as base } from "@playwright/test"
import { AdminLoanRequestOverviewPage } from "./pages/admin/loanrequest-overview-page"
import { AdminLoginPage } from "./pages/admin/login-page"
import { AdminLoanRequestPage } from "./pages/admin/loanrequest-page"
import { LoanRequestPage } from "./pages/loanrequest-page"

type MyFixtures = {
    adminLoginPage: AdminLoginPage
    adminLoanRequestOverviewPage: AdminLoanRequestOverviewPage
    adminLoanRequestPage: AdminLoanRequestPage
    loanRequestPage: LoanRequestPage
}

export const test = base.extend<MyFixtures>({
    page: async({page}, use) => {
        page.goto('https://loanapplication.gmie.nl')
        await use(page)
        //
    },
    adminLoginPage: async ({page}, use) => {
        await use(new AdminLoginPage(page))
    },
    adminLoanRequestOverviewPage: async ({page}, use) => {
        await use(new AdminLoanRequestOverviewPage(page))
    },
    adminLoanRequestPage: async ({page}, use) => {
        await use(new AdminLoanRequestPage(page))
    },
    loanRequestPage: async ({page}, use) => {
        await use(new LoanRequestPage(page))
    },
})

export { expect } from "@playwright/test"

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  };
  return new Intl.DateTimeFormat(undefined, options).format(date);
}