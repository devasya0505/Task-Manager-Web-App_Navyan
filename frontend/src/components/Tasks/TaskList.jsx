import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { useTask } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import './Tasks.css';

const TaskList = ({ onEditTask }) => {
  const { tasks, loading, toggleTaskStatus, deleteTask, reorderTasks } = useTask();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const reordered = Array.from(tasks);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    reorderTasks(reordered);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <HiOutlineClipboardList />
        </div>
        <h3>No tasks found</h3>
        <p>Click &quot;Add Task&quot; to create your first task and start getting organized!</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="task-list">
        {(provided) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={snapshot.isDragging ? 'dragging' : ''}
                  >
                    <TaskItem
                      task={task}
                      onToggle={toggleTaskStatus}
                      onEdit={onEditTask}
                      onDelete={deleteTask}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
