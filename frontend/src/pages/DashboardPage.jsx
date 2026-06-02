import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import StatsCards from '../components/Dashboard/StatsCards';
import TaskFilters from '../components/Tasks/TaskFilters';
import TaskList from '../components/Tasks/TaskList';
import TaskForm from '../components/Tasks/TaskForm';
import Modal from '../components/UI/Modal';
import '../components/Layout/Layout.css';
import '../components/Dashboard/Dashboard.css';

const DashboardPage = () => {
  const { user } = useAuth();
  const { fetchTasks, createTask, updateTask } = useTask();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (editingTask) {
      await updateTask(editingTask._id, formData);
    } else {
      await createTask(formData);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Get current greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <>
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="app-layout">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="main-content">
          <div className="dashboard-header">
            <h1>{getGreeting()}, {user?.name?.split(' ')[0]} 👋</h1>
            <p>Here&apos;s an overview of your tasks</p>
          </div>

          <StatsCards />
          <TaskFilters onAddClick={handleAddTask} />
          <TaskList onEditTask={handleEditTask} />
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
          initialData={editingTask}
        />
      </Modal>
    </>
  );
};

export default DashboardPage;
