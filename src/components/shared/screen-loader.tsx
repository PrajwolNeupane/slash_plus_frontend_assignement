import { Oval } from "react-loader-spinner";

export default function ScreenLoader() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <Oval height={100} width={100} color="#24394d" secondaryColor="grey" />
    </div>
  );
}
