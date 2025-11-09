import React, { useState } from "react";

interface HierarchyTreeProps {
  data: Record<string, any>;
  level?: number;
}

const HierarchyTree: React.FC<HierarchyTreeProps> = ({ data, level = 0 }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div style={{ paddingLeft: level * 16 }}>
      {Object.keys(data).map((key) => {
        const hasChildren = Object.keys(data[key] || {}).length > 0;

        return (
          <div key={key} className="my-1">
            <div
              onClick={() => hasChildren && toggleExpand(key)}
              className={`flex items-center cursor-pointer px-2 py-1 rounded-md ${
                hasChildren ? "hover:bg-gray-100" : ""
              }`}
            >
              <span className="mr-2">
                {hasChildren ? (expanded[key] ? "📂" : "📁") : "📄"}
              </span>
              <span className="font-medium">{key}</span>
            </div>

            {hasChildren && expanded[key] && (
              <div className="border-l border-gray-200 ml-4 pl-3">
                <HierarchyTree data={data[key]} level={level + 1} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HierarchyTree;
