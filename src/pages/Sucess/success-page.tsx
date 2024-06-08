import { useDashboard } from "@features/service/dashboard/dashboard.api";
import { useQuery } from "@tanstack/react-query";
import { CustomTable, ScreenLoader } from "@components/shared";
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
    return <ScreenLoader />;
  }

  return (
    <div className="flex flex-col bg-gray-50 gap-7 w-full min-h-screen items-start rg:pt-28 pt-32  pb-4 2xl:px-[8%] lg:px-[5%] px-[3%]">
      <div className="w-full flex-wrap flex items-center gap-[2%]">
        <div className="p-4 border-2 border-primary w-[49%] rounded-xl flex flex-col">
          <h2 className="xl:text-xl rg:text-lg sm:text-base text-xs text-primary">
            Total Users
          </h2>
          <h1 className="xl:text-3xl rg:text-2xl sm:text-xl text-lg font-medium text-primary leading-[150%]">
            {data?.data?.userCount}
          </h1>
        </div>
        <div className="p-4 border-2 border-primary w-[49%] rounded-xl flex flex-col">
          <h2 className="xl:text-xl rg:text-lg sm:text-base text-xs text-primary">
            Logged in Count
          </h2>
          <h1 className="xl:text-3xl rg:text-2xl sm:text-xl text-lg font-medium text-primary leading-[150%]">
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
