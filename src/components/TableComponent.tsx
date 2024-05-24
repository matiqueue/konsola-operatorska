import React from "react";
import { DataItem, SortConfig } from "../lib/types.ts";

interface TableComponentProps {
  data: DataItem[];
  sortConfig: SortConfig | null;
  requestSort: (key: keyof DataItem) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  sortConfig,
  requestSort,
}) => {
  return data.length > 0 ? (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => requestSort("Id")}>
            Id{" "}
            {sortConfig && sortConfig.key === "Id"
              ? sortConfig.direction === "ascending"
                ? "↑"
                : "↓"
              : ""}
          </th>
          <th onClick={() => requestSort("Name")}>
            Name{" "}
            {sortConfig && sortConfig.key === "Name"
              ? sortConfig.direction === "ascending"
                ? "↑"
                : "↓"
              : ""}
          </th>
          <th onClick={() => requestSort("Type")}>
            Type{" "}
            {sortConfig && sortConfig.key === "Type"
              ? sortConfig.direction === "ascending"
                ? "↑"
                : "↓"
              : ""}
          </th>
          <th onClick={() => requestSort("SerialNumber")}>
            SerialNumber{" "}
            {sortConfig && sortConfig.key === "SerialNumber"
              ? sortConfig.direction === "ascending"
                ? "↑"
                : "↓"
              : ""}
          </th>
          <th onClick={() => requestSort("Strength")}>
            Strength{" "}
            {sortConfig && sortConfig.key === "Strength"
              ? sortConfig.direction === "ascending"
                ? "↑"
                : "↓"
              : ""}
          </th>
          <th onClick={() => requestSort("BatteryLevel")}>
            BatteryLevel{" "}
            {sortConfig && sortConfig.key === "BatteryLevel"
              ? sortConfig.direction === "ascending"
                ? "↑"
                : "↓"
              : ""}
          </th>
          <th onClick={() => requestSort("WorkingMode")}>
            WorkingMode{" "}
            {sortConfig && sortConfig.key === "WorkingMode"
              ? sortConfig.direction === "ascending"
                ? "↑"
                : "↓"
              : ""}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.Id}>
            <td>{item.Id}</td>
            <td>{item.Name}</td>
            <td>{item.Type}</td>
            <td>{item.SerialNumber}</td>
            <td>{item.Strength}</td>
            <td>{item.BatteryLevel}</td>
            <td>{item.WorkingMode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Ładowanie...</p>
  );
};

export default TableComponent;
