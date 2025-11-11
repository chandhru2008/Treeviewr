import { useEffect, useRef, useState } from "react";
import type { HierarchySearchProps } from "../types/types";

const HierarchySearch: React.FC<HierarchySearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(e:KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        ref={inputRef}
        onChange={handleChange}
        placeholder="Search (Press Ctrl + K)..."
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default HierarchySearch;
