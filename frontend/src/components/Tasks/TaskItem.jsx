import {
  HiOutlineCheck,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCalendar
} from 'react-icons/hi';
import { MdDragIndicator } from 'react-icons/md';
import './Tasks.css';

const TaskItem = ({ task, onToggle, onEdit, onDelete, dragHandleProps }) => {
  const isCompleted = task.status === 'completed';

  // Format due date
  const formatDueDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(d);
    taskDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((taskDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: 'Overdue', isOverdue: true };
    if (diffDays === 0) return { text: 'Today', isOverdue: false };
    if (diffDays === 1) return { text: 'Tomorrow', isOverdue: false };
    return {
      text: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      isOverdue: false
    };
  };

  const dueInfo = formatDueDate(task.dueDate);

  return (
    <div
      className={`task-item priority-${task.priority} ${isCompleted ? 'completed' : ''}`}
    >
      {/* Drag handle */}
      <div className="drag-handle" {...dragHandleProps}>
        <MdDragIndicator size={18} />
      </div>

      {/* Checkbox */}
      <button
        className={`task-checkbox ${isCompleted ? 'checked' : ''}`}
        onClick={() => onToggle(task._id)}
        aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {isCompleted && <HiOutlineCheck />}
      </button>

      {/* Task body */}
      <div className="task-body">
        <div className="task-title">{task.title}</div>
        {task.description && (
          <div className="task-description">{task.description}</div>
        )}
        <div className="task-meta">
          <span className={`task-badge badge-priority-${task.priority}`}>
            {task.priority}
          </span>
          {task.status !== 'completed' && task.status !== 'pending' && (
            <span className="task-badge badge-status">
              {task.status}
            </span>
          )}
          {task.category && task.category !== 'General' && (
            <span className="task-badge badge-category">
              {task.category}
            </span>
          )}
          {dueInfo && (
            <span className={`task-badge ${dueInfo.isOverdue && !isCompleted ? 'badge-overdue' : 'badge-due'}`}>
              <HiOutlineCalendar size={12} />
              {dueInfo.text}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="task-actions">
        <button
          className="task-action-btn"
          onClick={() => onEdit(task)}
          aria-label="Edit task"
          title="Edit task"
        >
          <HiOutlinePencil />
        </button>
        <button
          className="task-action-btn delete"
          onClick={() => onDelete(task._id)}
          aria-label="Delete task"
          title="Delete task"
        >
          <HiOutlineTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
