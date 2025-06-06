import Image from "next/image";

const EducationLoading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="space-y-6 px-2 text-center">
        {/* Animated Spinner with Educational Icons */}
        <div className="relative mx-auto h-24 w-24">
          <div className="border-t-main absolute inset-0 animate-spin rounded-full border-4 border-gray-300"></div>
          <div className="absolute inset-0 flex animate-pulse items-center justify-center">
            <Image
              src="/Edu-logo.png"
              alt="EduGenius Logo"
              width={28}
              height={28}
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Preparing Your Learning Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Loading educational content...
          </p>
        </div>

        {/* Optional Progress Dots */}
        <div className="flex justify-center gap-2">
          <div
            className="bg-main h-2 w-2 animate-bounce rounded-full"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="bg-main h-2 w-2 animate-bounce rounded-full"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="bg-main h-2 w-2 animate-bounce rounded-full"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EducationLoading;
