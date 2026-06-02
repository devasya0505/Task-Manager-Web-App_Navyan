import { FaTasks } from 'react-icons/fa';
import { HiOutlineLogout, HiOutlineMenu } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../UI/ThemeToggle';
import './Layout.css';

const Navbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <button className="navbar-btn menu-toggle" onClick={onMenuToggle} aria-label="Toggle menu">
          <HiOutlineMenu />
        </button>
        <div className="navbar-logo">
          <FaTasks />
        </div>
        <span className="navbar-title">TaskFlow</span>
      </div>

      <div className="navbar-actions">
        <span className="navbar-greeting">
          Hello, <span>{user?.name}</span>
        </span>
        <ThemeToggle />
        <button className="logout-btn" onClick={logout} aria-label="Logout">
          <HiOutlineLogout size={18} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
