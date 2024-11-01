import { fireEvent, render } from "@testing-library/react";

import "@testing-library/jest-dom";
import PeriodSelector from "./PeriodSelector";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" }
  })
}));

describe("PeriodSelector", () => {
  const mockOnSelect = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders buttons for each period", () => {
    const { getByLabelText } = render(<PeriodSelector currentPeriod="month" onSelect={mockOnSelect} />);

    expect(getByLabelText("PeriodSelector.month.title")).toBeInTheDocument();
    expect(getByLabelText("PeriodSelector.week.title")).toBeInTheDocument();
    expect(getByLabelText("PeriodSelector.day.title")).toBeInTheDocument();
  });

  it("disables the button for the current period", () => {
    const { getByLabelText } = render(<PeriodSelector currentPeriod="week" onSelect={mockOnSelect} />);

    expect(getByLabelText("PeriodSelector.week.title")).toBeDisabled();
  });

  it("calls onSelect when a button is clicked", () => {
    const { getByLabelText } = render(<PeriodSelector currentPeriod="month" onSelect={mockOnSelect} />);

    fireEvent.click(getByLabelText("PeriodSelector.week.title"));

    expect(mockOnSelect).toHaveBeenCalledWith("week");
  });

  it("does not call onSelect when the current period button is clicked", () => {
    const { getByLabelText } = render(<PeriodSelector currentPeriod="day" onSelect={mockOnSelect} />);

    fireEvent.click(getByLabelText("PeriodSelector.day.title"));

    expect(mockOnSelect).not.toHaveBeenCalled();
  });
});
