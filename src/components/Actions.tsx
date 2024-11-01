import classNames from "classnames";
import { PropsWithChildren } from "react";

import DateSet from "../ProductionCalendar/DateSet";
import { TaskFile } from "../AppTypes";

interface ActionsProps {
  readonly className?: string;
  readonly date: Date;
  readonly holidays: DateSet;
  readonly tasks: TaskFile[];
  readonly setTasks: (tasks: TaskFile[]) => void;
}

function Actions({ className, children }: ActionsProps & PropsWithChildren) {
  return <div className={classNames("actions", className)}>{children}</div>;
}

export default Actions;
