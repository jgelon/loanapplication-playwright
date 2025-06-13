import { expect, test } from "../fixtures";

test.beforeEach(async ({adminLoginPage, request }) => {
  await adminLoginPage.goto()
  await adminLoginPage.adminLogin()

  //Create request via api
  var generate = await request.get('http://loanapplication-be.gmie.nl/loanrequests/generate')
  expect(generate.ok()).toBeTruthy()
})

test('Approve a request', async ({ adminLoanRequestOverviewPage, adminLoanRequestPage }) => {
  await adminLoanRequestOverviewPage.openLastRequest()
  await adminLoanRequestPage.approve()
  await expect(adminLoanRequestPage.page.locator('app-loandecision')).toContainText('Decision: APPROVED')
  
  const text = "test comment"
  await adminLoanRequestPage.comment(text)
  expect(await adminLoanRequestPage.listComments()).toHaveLength(1)
});

test('Decline a request', async ({ adminLoanRequestOverviewPage, adminLoanRequestPage }) => {
  await adminLoanRequestOverviewPage.openLastRequest()
  await adminLoanRequestPage.decline()
  await expect(adminLoanRequestPage.page.locator('app-loandecision')).toContainText('Decision: DECLINED')
  
  const text = "test comment"
  await adminLoanRequestPage.comment(text)
  expect(await adminLoanRequestPage.listComments()).toHaveLength(1)
});