import { v4 as uuidv4 } from "uuid";

describe("payment", () => {
  it("user can make payment", () => {
    // login
    cy.visit("/");
    cy.findByRole("textbox", { name: /username/i }).type("johndoe");
    cy.findByLabelText(/password/i).type("s3cret");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /sign in/i }).click();
    //check account balanceAtCompletion
    let oldBalance = "";
    cy.get('[data-test="sidenav-user-balance"]').then((balance) => (oldBalance = balance.text()));
    // .then((balance) => console.log(balance));
    //click on new  buttonText
    cy.findByRole("button", { name: /new/i }).click();
    // it should go to transaction page
    cy.url().should("include", "transaction/new"); // => true
    // search for user
    cy.findByRole("textbox").type("devon becker");

    cy.findByText(/devon becker/i).click();
    const paymentAmount = "500";
    //add amount and note and click pay
    cy.findByPlaceholderText(/amount/i).type(paymentAmount);
    const note = uuidv4();
    cy.findByPlaceholderText(/add a note/i).type(note);

    cy.findByRole("button", { name: /pay/i }).click();
    // return to transactions
    cy.findByRole("button", { name: /return to transactions/i }).click();
    // goto personal payments
    cy.findByRole("tab", { name: /mine/i });
    // click on payment
    cy.findByText(note).click({ force: true });

    // verify if payment was made by
    cy.findByText(`-$${paymentAmount}`).should("be.visible");
    cy.findByText(note).should("be.visible");
    // verify if payment amount was deducted
  });
});
