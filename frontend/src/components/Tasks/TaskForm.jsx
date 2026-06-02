import { useState, useEffect } from 'react';
import './Tasks.css';

const TaskForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'General',
    dueDate: '',
    status: 'pending'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 'medium',
        category: initialData.category || 'General',
        dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
        status: initialData.status || 'pending'
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const submitData = { ...formData };
    if (!submitData.dueDate) {
      submitData.dueDate = null;
    }

    onSubmit(submitData);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="task-title">Task Title *</label>
        <input
          id="task-title"
          type="text"
          name="title"
          className="form-input"
          placeholder="What needs to be done?"
          value={formData.title}
          onChange={handleChange}
          autoFocus
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          name="description"
          className="form-input"
          placeholder="Add more details (optional)"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            name="priority"
            className="form-input"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="task-status">Status</label>
          <select
            id="task-status"
            name="status"
            className="form-input"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-category">Category</label>
          <input
            id="task-category"
            type="text"
            name="category"
            className="form-input"
            placeholder="e.g., Work, Personal"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-dueDate">Due Date</label>
          <input
            id="task-dueDate"
            type="date"
            name="dueDate"
            className="form-input"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="task-form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
