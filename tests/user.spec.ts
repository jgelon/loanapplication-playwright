import { expect, test } from "../fixtures";
import { createRandomPerson } from "../models/Person";


test('Request a loan', async ({ loanRequestPage, page }) => {
  const person = createRandomPerson()
  await loanRequestPage.goto()
  await loanRequestPage.selectLoan('Car-loan', 25000)
  await loanRequestPage.next()
  await loanRequestPage.acknowledgeKnowledge()
  await loanRequestPage.next()
  await loanRequestPage.fillDetails(person)
  await loanRequestPage.next()
  await loanRequestPage.requestTheLoan()

  const number = await loanRequestPage.getLoanId()
  console.log(`Request ID: ${number}`);
});