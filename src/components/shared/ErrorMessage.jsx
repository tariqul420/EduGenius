import { Button } from "@/components/ui/button";

export default function ErrorMessage({ handleClick }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white px-4 py-12 transition-colors duration-200 dark:bg-black">
      <div className="w-full max-w-2xl space-y-6 text-center">
        <div className="relative">
          <h1 className="mb-4 text-2xl font-bold sm:text-3xl">
            Looks like you&apos;ve found the doorway to the great nothing
          </h1>
          <p className="dark:text-medium-bg mb-6 text-base text-gray-600 sm:text-lg">
            Sorry about that! Please try again or visit our homepage to get
            where you need to go.
          </p>
          <Button
            onClick={handleClick}
            className="bg-main hover:bg-dark-main cursor-pointer rounded-md px-6 py-2 text-white transition-colors duration-200"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
