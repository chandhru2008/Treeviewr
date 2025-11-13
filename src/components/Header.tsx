import { useTheme } from "./ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">Hierarchy Layout</h1>

      <button
        onClick={toggleTheme}
        className={`relative flex items-center w-20 h-9 rounded-full px-2 transition-all duration-300 border
          ${theme === "light"
            ? "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
            : "bg-gray-800 border-gray-600 text-gray-100 hover:bg-gray-700"
          }`}
      >
        {/* Toggle circle */}
        <div
          className={`absolute top-1 left-1.5 w-7 h-7 rounded-full bg-white shadow-md transform transition-transform duration-300
            ${theme === "light" ? "translate-x-0" : "translate-x-10"}
          `}
        ></div>

        {/* Icons */}
        <div className="flex items-center justify-between w-full z-10 text-lg">
          <span>🌞</span>
          <span>🌙</span>
        </div>
      </button>
    </div>
  );
};

export default Header;
