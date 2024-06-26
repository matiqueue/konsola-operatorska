"use client";

import { getIconBattery, getIconType } from "../lib/icons";
import { getIconStrenght } from "../lib/icons";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataItem, SortConfig } from "../lib/types";
import { useState } from "react";

const columns: ColumnDef<DataItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("Name")}</div>,
  },
  {
    accessorKey: "Type",
    header: () => <div className="text-center">Type</div>,
    cell: ({ row }) => {
      const type = String(row.getValue("Type"));
      const icon = getIconType(type);
      return (
        <div className="flex justify-center">
          <img src={icon} alt="Image" width="40" height="auto" />
        </div>
      );
    },
  },
  {
    accessorKey: "SerialNumber",
    header: "Serial Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("SerialNumber")}</div>
    ),
  },
  {
    accessorKey: "BatteryLevel",
    header: () => <div className="text-center">Battery Level</div>,
    cell: ({ row }) => {
      const batteryLevel = parseFloat(row.getValue("BatteryLevel"));
      const icon = getIconBattery(batteryLevel);
      return (
        <div className="flex justify-center">
          <img src={icon} alt="Image" width="40" height="auto" />
        </div>
      );
    },
  },
  {
    accessorKey: "Strength",
    header: () => <div className="text-center">Strength</div>,
    cell: ({ row }) => {
      const strength = parseFloat(row.getValue("Strength"));
      const iconstrenght = getIconStrenght(strength);

      return (
        <div className="flex justify-center">
          <img src={iconstrenght} alt="Image" width="40" height="auto" />
        </div>
      );
    },
  },
  {
    accessorKey: "WorkingMode",
    header: "Working Mode",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("WorkingMode")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.Id)}
            >
              Copy item ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface TableComponentProps {
  data: DataItem[];
  sortConfig: SortConfig | null;
  requestSort: (key: keyof DataItem) => void;
  selectedDevice: DataItem | null; // Dodana definicja dla wybranego urządzenia
  onDeviceSelection: (device: DataItem) => void; // Funkcja obsługująca zmianę wybranego urządzenia
}

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  selectedDevice,
  onDeviceSelection,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const handleRowClick = (device: DataItem) => {
    if (selectedDevice !== device) {
      onDeviceSelection(device);
    }
  };
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {/* Filtr */}
        <Input
          placeholder="Filter items..."
          value={(table.getColumn("Type")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Type")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* Menu rozwijane kolumn */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Tabela */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={
                    row.original === selectedDevice ? "selected" : undefined
                  } // Zaznaczenie wiersza odpowiadającego wybranemu urządzeniu
                  onClick={() => handleRowClick(row.original)} // Obsługa kliknięcia na wiersz
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Licznik wybranych urządzeń i nawigacja */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
