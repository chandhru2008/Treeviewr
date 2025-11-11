import React, { useState, useEffect } from "react";
import HierarchySearch from "./HierarchySearch";
import type { HierarchyTreeProps } from "../types/types";

const HierarchyTree: React.FC<HierarchyTreeProps> = ({
  data,
  level = 0,
  path = "",
  expanded,
  toggleExpand,
  searchQuery,
}) => {
  return (
    <div style={{ paddingLeft: '16px' }}>
      {Object.keys(data).map((key) => {
        const currentPath = path ? `${path}/${key}` : key;
        const hasChildren = Object.keys(data[key] || {}).length > 0;
        const isExpanded = expanded[currentPath];

        const isMatch =
          searchQuery &&
          key.toLowerCase().includes(searchQuery.toLowerCase());

        return (
          <div key={currentPath} className="my-1">
            <div
              onClick={() => hasChildren && toggleExpand(currentPath)}
              className={`flex items-center cursor-pointer px-2 py-1 rounded-md ${
                hasChildren ? "hover:bg-gray-100" : ""
              } ${isMatch ? "bg-yellow-200" : ""}`}
            >
              <span className="mr-2">
                {hasChildren ? (isExpanded ? "📂" : "📁") : "📄"}
              </span>
              <span className={`font-medium`}>{key}</span>
            </div>

            {hasChildren && isExpanded && (
              <div className="border-l border-gray-200 ml-4 transition-all duration-300 ease-in-out">
                <HierarchyTree
                  data={data[key]}
                  level={level + 1}
                  path={currentPath}
                  expanded={expanded}
                  toggleExpand={toggleExpand}
                  searchQuery={searchQuery}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};


const HierarchyTreeWrapper: React.FC<{ data: Record<string, any> }> = ({
  data,
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const toggleExpand = (path: string) => {
    setExpanded((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const findMatchingPaths = (
    obj: Record<string, any>,
    query: string,
    basePath = ""
  ): string[] => {
    let paths: string[] = [];
    for (const key of Object.keys(obj)) {
      const currentPath = basePath ? `${basePath}/${key}` : key;
      if (key.toLowerCase().includes(query.toLowerCase())) {
        paths.push(currentPath);
      }
      if (Object.keys(obj[key] || {}).length > 0) {
        const childPaths = findMatchingPaths(obj[key], query, currentPath);
        paths = [...paths, ...childPaths];
      }
    }
    return paths;
  };

  const expandParents = (paths: string[]) => {
    const newExpanded: Record<string, boolean> = {};
    paths.forEach((fullPath) => {
      const parts = fullPath.split("/");
      parts.pop(); 
      let parentPath = "";
      for (const part of parts) {
        parentPath = parentPath ? `${parentPath}/${part}` : part;
        newExpanded[parentPath] = true;
      }
    });
    return newExpanded;
  };

  useEffect(() => {
    if (!searchQuery) {
      setExpanded({});
      return;
    }
    const matchedPaths = findMatchingPaths(data, searchQuery);
    const expandedNodes = expandParents(matchedPaths);
    setExpanded(expandedNodes);
  }, [searchQuery, data]);

  return (
    <div className="p-4">
      <HierarchySearch onSearch={setSearchQuery} />
      <HierarchyTree
        data={data}
        expanded={expanded}
        toggleExpand={toggleExpand}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default HierarchyTreeWrapper;
