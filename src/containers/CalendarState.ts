import { Period } from "@src/AppTypes";
import { DateSet } from "@utils/date";

interface StateProps {
  readonly date: Date;
  readonly holidays: DateSet;
  readonly period: Period;
}

export const initialState: StateProps = {
  date: new Date(),
  holidays: new DateSet(),
  period: "month"
};

export type AddHolidays = { type: "ADD_HOLIDAYS"; payload: DateSet };
export type DateChange = { type: "DATE_CHANGE"; payload: Date };
export type PeriodChange = { type: "PERIOD_CHANGE"; payload: Period };

export function reducer(state: StateProps, action: DateChange | PeriodChange | AddHolidays) {
  switch (action.type) {
    case "ADD_HOLIDAYS":
      return {
        ...state,
        holidays: state.holidays.of(action.payload)
      };
    case "DATE_CHANGE":
      return {
        ...state,
        date: action.payload
      };
    case "PERIOD_CHANGE":
      return { ...state, period: action.payload };
    default:
      return state;
  }
}
