import { rankItem } from "@tanstack/match-sorter-utils";
import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import React from "react";

interface CustomTableProps<TData> {
  title: string;
  data: TData[];
  columnsData: ColumnDef<TData>[];
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function CustomTable<T>({ title, data, columnsData }: CustomTableProps<T>) {
  const initialState = {
    // Move initialState here
    pagination: {
      pageSize: data?.length,
    },
  };

  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  //Enquiry table columns =====================
  const columns = React.useMemo<ColumnDef<any>[]>(() => [...columnsData], []);

  const table = useReactTable({
    data,
    initialState: initialState,
    columns,
    state: {
      rowSelection,
      globalFilter,
      // columnFilters,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <div className="w-full">
      {/* Table section ========================= */}
      <div className="flex flex-col rounded-md w-full py-1 border-2 border-primary">
        <div className="flex lg:flex-row flex-col justify-between py-2 px-5 w-full items-center rounded-md">
          <div className="text-xl text-primary">{title}</div>
        </div>
        {/* Table ========================== */}
        <div className="w-full overflow-auto h-[55vh]">
          <table className="w-full relative border-separate border-spacing-0">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  className="text-base h-[50px] text-black bg-gray-200 sticky top-0 left-0 z-10"
                  key={headerGroup.id}
                >
                  {headerGroup.headers.map((header) => {
                    const headerTitle = header.column.columnDef.header;

                    return (
                      <th
                        className="font-regular text-start border-y-primary border-y-[1px] pl-4"
                        key={header.id}
                        colSpan={header.colSpan}
                      >
                        {header.isPlaceholder ? null : (
                          <>{flexRender(headerTitle, header.getContext())}</>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, idx) => {
                return (
                  <tr
                    className={classNames(
                      "h-[45px] text-[#424242] font-regular text-base text-start ",
                      idx % 2 != 0 ? "bg-[#E9EBED]" : ""
                    )}
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td className="pl-4" key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomTable;
