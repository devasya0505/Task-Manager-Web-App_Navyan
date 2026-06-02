import {
  HiOutlineViewGrid,
  HiOutlineClipboardList,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineExclamation,
  HiOutlineTag
} from 'react-icons/hi';
import { useTask } from '../../context/TaskContext';
import './Layout.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { filters, updateFilters, fetchTasks, getStats, getCategories } = useTask();
  const stats = getStats();
  const categories = getCategories();

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    updateFilters(newFilters);
    fetchTasks(newFilters);
    onClose();
  };

  const statusLinks = [
    { label: 'All Tasks', value: 'all', icon: <HiOutlineViewGrid />, count: stats.total },
    { label: 'Pending', value: 'pending', icon: <HiOutlineClock />, count: stats.pending },
    { label: 'In Progress', value: 'in-progress', icon: <HiOutlineClipboardList />, count: stats.inProgress },
    { label: 'Completed', value: 'completed', icon: <HiOutlineCheckCircle />, count: stats.completed }
  ];

  const priorityLinks = [
    { label: 'All Priorities', value: 'all', icon: <HiOutlineViewGrid /> },
    { label: 'High Priority', value: 'high', icon: <HiOutlineExclamation /> },
    { label: 'Medium Priority', value: 'medium', icon: <HiOutlineExclamation /> },
    { label: 'Low Priority', value: 'low', icon: <HiOutlineExclamation /> }
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-section">
          <div className="sidebar-section-title">Status</div>
          <nav className="sidebar-nav">
            {statusLinks.map((link) => (
              <button
                key={link.value}
                className={`sidebar-link ${filters.status === link.value ? 'active' : ''}`}
                onClick={() => handleFilterChange('status', link.value)}
              >
                <span className="icon">{link.icon}</span>
                {link.label}
                {link.count !== undefined && <span className="count">{link.count}</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-divider" />

        <div className="sidebar-section">
          <div className="sidebar-section-title">Priority</div>
          <nav className="sidebar-nav">
            {priorityLinks.map((link) => (
              <button
                key={link.value}
                className={`sidebar-link ${filters.priority === link.value ? 'active' : ''}`}
                onClick={() => handleFilterChange('priority', link.value)}
              >
                <span className="icon">{link.icon}</span>
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {categories.length > 0 && (
          <>
            <div className="sidebar-divider" />
            <div className="sidebar-section">
              <div className="sidebar-section-title">Categories</div>
              <nav className="sidebar-nav">
                <button
                  className={`sidebar-link ${filters.category === 'all' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('category', 'all')}
                >
                  <span className="icon"><HiOutlineTag /></span>
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`sidebar-link ${filters.category === cat ? 'active' : ''}`}
                    onClick={() => handleFilterChange('category', cat)}
                  >
                    <span className="icon"><HiOutlineTag /></span>
                    {cat}
                  </button>
                ))}
              </nav>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
