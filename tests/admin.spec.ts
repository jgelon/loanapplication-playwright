import { expect, test } from "../fixtures";

test.beforeEach(async ({loginPage, request }) => {
  loginPage.goto()
  loginPage.adminLogin()

  //Create request via api
  var generate = await request.get('http://loanapplication-be.gmie.nl/loanrequests/generate')
  expect(generate.ok()).toBeTruthy()
})

test('Approve a request', async ({ loanRequestOverviewPage, loanRequestPage }) => {
  await loanRequestOverviewPage.openLastRequest()
  await loanRequestPage.approve()
  await expect(loanRequestPage.page.locator('app-loandecision')).toContainText('Decision: APPROVED')
  
  const text = "test comment"
  await loanRequestPage.comment(text)
  expect(await loanRequestPage.listComments()).toHaveLength(1)
});