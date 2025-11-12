import { useTheme } from "./ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">Hierarchy Layout</h1>

      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-md text-sm font-medium border border-gray-300 dark:border-gray-600
                   bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
                   hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        {theme === "light" ? "🌞 Light" : "🌙 Dark"}
      </button>
    </div>
  );
};

export default Header;
