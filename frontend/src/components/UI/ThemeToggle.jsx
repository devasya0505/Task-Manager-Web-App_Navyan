import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';
import './UI.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="icon">
        {theme === 'dark' ? <HiOutlineSun /> : <HiOutlineMoon />}
      </span>
    </button>
  );
};

export default ThemeToggle;
