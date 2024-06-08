export default function SuccessPage() {
  return (
    <div className="flex bg-gray-50 w-full min-h-screen items-start pt-28 pb-8 px-[8%]">
      <div className="w-full flex-wrap flex items-center gap-[2%]">
        <div className="p-4 border-2 border-primary w-[49%] rounded-xl flex flex-col">
          <h2 className="text-xl  text-primary">Total Users</h2>
          <h1 className="text-5xl font-medium text-primary leading-[150%]">
            90
          </h1>
        </div>
        <div className="p-4 border-2 border-primary w-[49%] rounded-xl flex flex-col">
          <h2 className="text-xl  text-primary">Logged in Count</h2>
          <h1 className="text-5xl font-medium text-primary leading-[150%]">
            90
          </h1>
        </div>
      </div>
    </div>
  );
}
