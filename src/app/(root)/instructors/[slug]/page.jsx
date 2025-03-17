import Rating from "@/components/shared/Rating";
import { BookOpenText, UsersRound } from "lucide-react";
import Image from "next/image";

export default function Instructor() {
  const userPreferences = [0.2, 0.3, 0.4];
  return (
    <section>
      <div className="container mx-auto py-8 max-sm:px-4 lg:max-w-6xl">
        <div className="flex w-full overflow-hidden bg-white shadow-lg">
          <Image
            src="https://i.ibb.co/9kngr6fK/instructor1.png"
            alt="aa"
            width={400}
            height={400}
          />
          <div className="mt-4 space-y-2">
            <h2 className="text-3xl font-bold">kofras namroe</h2>
            <p className="text-sm text-gray-500">Assistant Lecturer</p>

            <div className="mt-2">
              <Rating />

              <div className="mt-4 flex gap-4">
                <div className="flex w-fit items-start justify-between gap-3 bg-green-100 px-8 py-3">
                  <UsersRound
                    strokeWidth={1}
                    size={30}
                    className="text-green text-2xl"
                  />
                  <div>
                    <p className="text-lg font-bold">1000</p>
                    <p className="text-sm text-gray-500">Students</p>
                  </div>
                </div>

                <div className="flex w-fit items-start justify-between gap-3 bg-green-100 px-8 py-3">
                  <BookOpenText
                    strokeWidth={1}
                    size={30}
                    className="text-green text-2xl"
                  />
                  <div>
                    <p className="text-lg font-bold">1000</p>
                    <p className="text-sm text-gray-500">Course</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-4">
                <div className="border-r border-gray-200 pr-4">
                  <p className="text-lg font-bold">1000</p>
                  <p className="text-sm text-gray-500">Following</p>
                </div>

                <div>
                  <p className="text-lg font-bold">1000</p>
                  <p className="text-sm text-gray-500">Followers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
