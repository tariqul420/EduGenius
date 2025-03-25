import { Loader } from "lucide-react";

const Loading = () => {
    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <Loader className="text-4xl text-primary animate-spin" />
        </div>
    );
};

export default Loading;