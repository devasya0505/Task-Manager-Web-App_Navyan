import {
  HiOutlineClipboardList,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineExclamation
} from 'react-icons/hi';
import { useTask } from '../../context/TaskContext';
import './Dashboard.css';

const StatsCards = () => {
  const { getStats } = useTask();
  const stats = getStats();

  const completionRate = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  const cards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: <HiOutlineClipboardList />,
      type: 'total'
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: <HiOutlineCheckCircle />,
      type: 'completed'
    },
    {
      label: 'Pending',
      value: stats.pending + stats.inProgress,
      icon: <HiOutlineClock />,
      type: 'pending'
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: <HiOutlineExclamation />,
      type: 'overdue'
    }
  ];

  return (
    <div className="stats-grid">
      {cards.map((card) => (
        <div key={card.type} className="stat-card">
          <div className={`stat-icon ${card.type}`}>
            {card.icon}
          </div>
          <div className="stat-info">
            <div className="stat-value">{card.value}</div>
            <div className="stat-label">{card.label}</div>
            {card.type === 'completed' && stats.total > 0 && (
              <div className="stat-progress">
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
                <span className="progress-text">{completionRate}% complete</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
