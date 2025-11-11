export interface HierarchyTreeProps {
  data: Record<string, any>;
  level?: number;
  path?: string;
  expanded: Record<string, boolean>;
  toggleExpand: (path: string) => void;
  searchQuery: string;
}

export interface HierarchySearchProps {
  onSearch: (query: string) => void;
}