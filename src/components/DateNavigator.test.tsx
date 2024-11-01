import { fireEvent, render, screen } from "@testing-library/react";
import { useTranslation } from "react-i18next";

import "@testing-library/jest-dom";
import DateNavigator from "./DateNavigator";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}));

describe("DateNavigator", () => {
  const mockOnChange = jest.fn();
  const mockTitle = "Test Title";

  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslation as jest.Mock).mockReturnValue({ t: (key: string) => key });
  });

  it("renders the title and buttons", () => {
    render(<DateNavigator title={mockTitle} onChange={mockOnChange} />);

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByLabelText("DateNavigator.Decrement.button.aria-label")).toBeInTheDocument();
    expect(screen.getByLabelText("DateNavigator.Increment.button.aria-label")).toBeInTheDocument();
  });

  it("calls onChange with false when decrement button is clicked", () => {
    render(<DateNavigator title={mockTitle} onChange={mockOnChange} />);

    const decrementButton = screen.getByLabelText("DateNavigator.Decrement.button.aria-label");
    fireEvent.click(decrementButton);

    expect(mockOnChange).toHaveBeenCalledWith(false);
  });

  it("calls onChange with true when increment button is clicked", () => {
    render(<DateNavigator title={mockTitle} onChange={mockOnChange} />);

    const incrementButton = screen.getByLabelText("DateNavigator.Increment.button.aria-label");
    fireEvent.click(incrementButton);

    expect(mockOnChange).toHaveBeenCalledWith(true);
  });
});
