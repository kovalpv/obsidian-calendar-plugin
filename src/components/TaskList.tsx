import { TaskWithSource } from "@src/AppTypes";
import "./TaskList.css";

interface TaskListProps {
  readonly date: Date;
  readonly tasks: TaskWithSource[];
  readonly onTaskClick: (task: TaskWithSource) => void;
}

const GROUP_ICON: Record<string, string> = {
  "Вчера": "⏪",
  "Обсуждения": "💬",
  "Ожидание": "⏳️",
  "Отложено": "⏱️",
  "Планы": "📅",
  "Сегодня": "🪚",
  "Тестирование": "🧪",
  "Расследование": "🔍",
  "Рекомендации по устранению ошибки": "💡"
};

export function getWorkIcon(group: string | null | undefined): string {
  const workIcon = "🪚";

  if (!group) {
    return workIcon;
  }
  return GROUP_ICON[group] ?? workIcon;
}

export function getTaskIcon(done: boolean, group: string | null | undefined) {
  return done ? "✅" : getWorkIcon(group);
}

function TaskList({ tasks, onTaskClick }: TaskListProps) {
  return (
    <div className="task-list">
      {tasks.map((d) => {
        return (
          <div
            className="task-item"
            title={d.description + (d.group === null || d.group === undefined ? "" : `[${d.group}]`)}
            key={d.source.path + d.sourceLine}
            onClick={() => onTaskClick(d)}
          >
            {d.task.whitespaces}
            {getTaskIcon(d.task.done, d.group)} {d.description}
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;
