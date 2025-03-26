import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-black">
      <Loader size={30} className="text-main animate-spin text-4xl" />
    </div>
  );
};

export default Loading;
