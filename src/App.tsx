import Header from "./components/Header";
import HierarchyTree from "./components/HierarchyTree";
import { hierarchyData } from "./data/sampledata";

function App() {
  return (
    <div className="min-h-screen p-10 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-xl border border-gray-200 dark:border-gray-700">
        <HierarchyTree data={hierarchyData} />
      </div>
    </div>
  );
}

export default App;
