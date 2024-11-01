import { DateChange, initialState, PeriodChange, reducer } from "./CalendarState";
import { Period } from "../AppTypes";

describe("reducer", () => {
  it("should handle DATE_CHANGE action", () => {
    const newDate = new Date(2024, 0, 1);

    const action: DateChange = { type: "DATE_CHANGE", payload: newDate };
    const newState = reducer(initialState, action);

    expect(newState.date).toEqual(newDate);
  });

  it("should handle PERIOD_CHANGE action", () => {
    const action: PeriodChange = {
      type: "PERIOD_CHANGE",
      payload: "week" as Period
    };
    const newState = reducer(initialState, action);

    expect(newState.period).toEqual("week");
    expect(newState.date).toEqual(initialState.date);
    expect(newState.holidays).toEqual(initialState.holidays);
  });

  it("should return the current state for unknown actions", () => {
    const unknownAction = { type: "UNKNOWN_ACTION" };
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const newState = reducer(initialState, unknownAction as unknown as any);

    expect(newState).toEqual(initialState);
  });
});
