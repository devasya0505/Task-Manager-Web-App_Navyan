import { useState } from 'react';
import { HiOutlineSearch, HiOutlinePlus } from 'react-icons/hi';
import { useTask } from '../../context/TaskContext';
import './Tasks.css';

const TaskFilters = ({ onAddClick }) => {
  const { filters, updateFilters, fetchTasks } = useTask();
  const [searchInput, setSearchInput] = useState(filters.search);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newFilters = { ...filters, search: searchInput };
      updateFilters(newFilters);
      fetchTasks(newFilters);
    }
  };

  const handleSearchBlur = () => {
    if (searchInput !== filters.search) {
      const newFilters = { ...filters, search: searchInput };
      updateFilters(newFilters);
      fetchTasks(newFilters);
    }
  };

  const handleSortChange = (e) => {
    const newFilters = { ...filters, sortBy: e.target.value };
    updateFilters(newFilters);
    fetchTasks(newFilters);
  };

  return (
    <div className="task-toolbar">
      <div className="task-toolbar-left">
        <div className="search-box">
          <HiOutlineSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchInput}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            onBlur={handleSearchBlur}
            id="search-tasks"
          />
        </div>

        <select
          className="sort-select"
          value={filters.sortBy}
          onChange={handleSortChange}
          id="sort-tasks"
          aria-label="Sort tasks"
        >
          <option value="createdAt">Newest First</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="title">Alphabetical</option>
        </select>
      </div>

      <button className="add-task-btn" onClick={onAddClick} id="add-task-btn">
        <HiOutlinePlus size={18} />
        Add Task
      </button>
    </div>
  );
};

export default TaskFilters;
