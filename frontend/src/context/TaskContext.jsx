import { createContext, useContext, useState, useCallback } from 'react';
import API from '../utils/api';
import toast from 'react-hot-toast';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
    search: '',
    sortBy: 'createdAt'
  });

  // Fetch tasks with filters
  const fetchTasks = useCallback(async (customFilters) => {
    setLoading(true);
    try {
      const activeFilters = customFilters || filters;
      const params = {};

      if (activeFilters.status !== 'all') params.status = activeFilters.status;
      if (activeFilters.priority !== 'all') params.priority = activeFilters.priority;
      if (activeFilters.category !== 'all') params.category = activeFilters.category;
      if (activeFilters.search) params.search = activeFilters.search;
      if (activeFilters.sortBy) params.sortBy = activeFilters.sortBy;

      const { data } = await API.get('/tasks', { params });
      setTasks(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Create task
  const createTask = async (taskData) => {
    try {
      const { data } = await API.post('/tasks', taskData);
      setTasks((prev) => [data, ...prev]);
      toast.success('Task created successfully!');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
      throw error;
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    try {
      const { data } = await API.put(`/tasks/${id}`, taskData);
      setTasks((prev) => prev.map((task) => (task._id === id ? data : task)));
      toast.success('Task updated successfully!');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      throw error;
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
      throw error;
    }
  };

  // Toggle task status
  const toggleTaskStatus = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    await updateTask(id, { status: newStatus });
  };

  // Reorder tasks (drag & drop)
  const reorderTasks = async (reorderedTasks) => {
    setTasks(reorderedTasks);
    try {
      await API.put('/tasks/reorder', { tasks: reorderedTasks });
    } catch (error) {
      toast.error('Failed to save task order');
      fetchTasks();
    }
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Get task statistics
  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
    const overdue = tasks.filter((t) => {
      if (!t.dueDate) return false;
      return new Date(t.dueDate) < new Date() && t.status !== 'completed';
    }).length;
    const highPriority = tasks.filter((t) => t.priority === 'high' && t.status !== 'completed').length;

    return { total, completed, pending, inProgress, overdue, highPriority };
  };

  // Get unique categories
  const getCategories = () => {
    const categories = [...new Set(tasks.map((t) => t.category))];
    return categories.sort();
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        filters,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        reorderTasks,
        updateFilters,
        getStats,
        getCategories
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
