import { useDashboard } from "@features/service/dashboard/dashboard.api";
import { useQuery } from "@tanstack/react-query";
import { CustomTable } from "@components/shared";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Log } from "@features/service/dashboard/dashboard.type";
import formatDate from "@utils/formateDate";

export default function SuccessPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: useDashboard,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const columnData = useMemo<ColumnDef<Log>[]>(
    () => [
      {
        header: "SN",
        cell: ({ row }) => row.index + 1,
      },
      {
        header: "Action",
        accessorKey: "action",
      },
      {
        header: "Time",
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
    ],
    []
  );

  if (isLoading) {
    return <h2>loading...</h2>;
  }

  return (
    <div className="flex flex-col bg-gray-50 gap-7 w-full min-h-screen items-start pt-28 pb-4 px-[8%]">
      <div className="w-full flex-wrap flex items-center gap-[2%]">
        <div className="p-4 border-2 border-primary w-[49%] rounded-xl flex flex-col">
          <h2 className="text-xl  text-primary">Total Users</h2>
          <h1 className="text-3xl font-medium text-primary leading-[150%]">
            {data?.data?.userCount}
          </h1>
        </div>
        <div className="p-4 border-2 border-primary w-[49%] rounded-xl flex flex-col">
          <h2 className="text-xl  text-primary">Logged in Count</h2>
          <h1 className="text-3xl font-medium text-primary leading-[150%]">
            {data?.data?.loginCount}
          </h1>
        </div>
      </div>
      <CustomTable<Log>
        title={"User Activity Log"}
        data={data?.data?.log!}
        columnsData={columnData}
      />
    </div>
  );
}
