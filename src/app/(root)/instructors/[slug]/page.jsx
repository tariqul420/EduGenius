import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Instructor() {
  return (
    <section>
      <div className="container mx-auto py-8 max-sm:px-4 lg:max-w-6xl">
        <div className="flex flex-wrap">
          <Card className="w-full max-w-sm">
            <CardHeader className="flex flex-col items-center space-y-4">
              <Image
                src="https://i.ibb.co/9kngr6fK/instructor1.png"
                alt="aa"
                width={120}
                height={400}
              />
              <div className="text-center">
                <CardTitle className="text-xl font-bold">
                  kofras namroe
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Assistant Lecturer
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex justify-around text-center">
              <div>
                <p className="text-sm text-gray-500">Reviews</p>
                <p className="text-lg font-bold">1</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Courses</p>
                <p className="text-lg font-bold">0</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Following</p>
                <p className="text-lg font-bold">0</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Followers</p>
                <p className="text-lg font-bold">0</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
