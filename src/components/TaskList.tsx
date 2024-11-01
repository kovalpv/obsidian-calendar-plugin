import { TaskFile } from "../AppTypes";
import "./TaskList.css";

interface TaskListProps {
  readonly date: Date;
  readonly tasks: TaskFile[];
  readonly taskClick: (task: TaskFile) => void;
}

function TaskList({ tasks, taskClick }: TaskListProps) {
  return (
    <div className="task-list">
      {tasks.map((d) => {
        return (
          <div
            className="task-item"
            title={d.description}
            key={d.source.path + d.sourceLine}
            onClick={() => taskClick(d)}
          >
            {d.task.done ? "✅" : "🕗"} {d.description}
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;
