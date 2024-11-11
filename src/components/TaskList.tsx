import { TaskWithSource } from "@src/AppTypes";
import "./TaskList.css";

interface TaskListProps {
  readonly date: Date;
  readonly tasks: TaskWithSource[];
  readonly onTaskClick: (task: TaskWithSource) => void;
}

function TaskList({ tasks, onTaskClick }: TaskListProps) {
  return (
    <div className="task-list">
      {tasks.map((d) => {
        return (
          <div
            className="task-item"
            title={d.description}
            key={d.source.path + d.sourceLine}
            onClick={() => onTaskClick(d)}
          >
            {d.task.done ? "✅" : "🕗"} {d.description}
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;
