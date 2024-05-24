import { DataItem, SortConfig } from "./types.ts";

export const sortData = (
  data: DataItem[],
  sortConfig: SortConfig | null
): DataItem[] => {
  let sortableData = [...data];
  if (sortConfig !== null) {
    sortableData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }
  return sortableData;
};
