import classNames from "classnames";
import { PropsWithChildren } from "react";
import { DateSet } from "@utils/date";
import { TaskWithSource } from "@src/AppTypes";

interface ActionsProps {
  readonly className?: string;
  readonly date: Date;
  readonly holidays: DateSet;
  readonly tasks: TaskWithSource[];
  readonly setTasks: (tasks: TaskWithSource[]) => void;
}

function Actions({ className, children }: ActionsProps & PropsWithChildren) {
  return <div className={classNames("actions", className)}>{children}</div>;
}

export default Actions;
