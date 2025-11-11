import HierarchyTree from "./components/HierarchyTree";
import { hierarchyData } from "./data/sampledata";

function App() {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Hierarchy Layout</h1>

      <div className="bg-white p-6 shadow rounded-xl">
        <HierarchyTree data={hierarchyData} />
      </div>
    </div>
  );
}

export default App;
