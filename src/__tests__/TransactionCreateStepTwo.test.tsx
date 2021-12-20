import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo, {
  TransactionCreateStepTwoProps,
} from "../components/TransactionCreateStepTwo";
import { createMock } from "ts-auto-mock";

test("On Initial render, the pay button is disabled", async () => {
  const mockProps: TransactionCreateStepTwoProps = createMock<TransactionCreateStepTwoProps>();
  //console.log(mockProps);
  render(<TransactionCreateStepTwo {...mockProps} />);
  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
});

test("If an amount and note is entered, pay button is enabled", async () => {
  const mockProps: TransactionCreateStepTwoProps = createMock<TransactionCreateStepTwoProps>();
  //console.log(mockProps);
  render(<TransactionCreateStepTwo {...mockProps} />);
  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");
  expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
});

