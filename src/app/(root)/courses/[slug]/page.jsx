import { auth } from "@clerk/nextjs/server";
import { getCourseBySlug } from "@/lib/actions/course.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  RefreshCcw,
  Star,
  Users,
  Clock,
  BookOpen,
  Award,
  Globe,
  DollarSign,
  Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const CourseDetails = async ({ params }) => {
  const { userId } = await auth();
  // Debugging logs
  // console.log("User ID:", userId);
  // console.log("Is user signed in?", !!userId);

  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  const {
    level,
    discount,
    price,
    students,
    thumbnail,
    language,
    description,
    category,
    duration,
    averageRating,
    instructor,
  } = course;

  const isSignedIn = !!userId; // ✅ boolean flag for UI logic

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-10 dark:bg-black">
      <div className="dark:bg-dark-bg container mx-auto max-w-3xl rounded-lg bg-white p-6 px-2.5 shadow-md md:p-10 md:px-8">
        <Image
          src={thumbnail}
          alt={category?.name}
          width={600}
          height={300}
          className="h-60 w-full rounded object-cover"
        />
        <h1 className="mt-4 text-2xl font-bold">{category.name}</h1>
        <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
          {description}
        </p>
        <div className="mt-2 flex gap-2 text-gray-500 sm:gap-5 dark:text-gray-400">
          <span>
            <p className="flex items-center gap-1.5">
              <Star
                size={16}
                color="#ffd500"
                strokeWidth={1}
                fill="#ffd500"
                absoluteStrokeWidth
              />
              {averageRating}
            </p>
          </span>
          <span>
            <p className="flex items-center gap-1.5">
              <Users size={16} strokeWidth={1} absoluteStrokeWidth /> {students}
            </p>
          </span>
          <span>
            <p className="flex items-center gap-1.5">
              <RefreshCcw size={16} strokeWidth={1} absoluteStrokeWidth /> Last
              Updated Mar 26, 2025
            </p>
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 text-base text-gray-700 sm:grid-cols-2 dark:text-gray-300">
          <p className="flex items-center gap-2">
            <BookOpen size={18} className="text-main-500" />
            <span className="font-medium">Level:</span> {level}
          </p>
          <p className="flex items-center gap-2">
            <Award size={18} className="text-blue-500" />
            <span className="font-medium">Instructor:</span> {instructor?.email}
          </p>
          <p className="flex items-center gap-2">
            <Globe size={18} className="text-purple-500" />
            <span className="font-medium">Language:</span> {language}
          </p>
          <p className="flex items-center gap-2">
            <Clock size={18} className="text-yellow-500" />
            <span className="font-medium">Duration:</span> {duration}
          </p>
          <p className="flex items-center gap-2">
            <DollarSign size={18} className="text-red-500" />
            <span className="font-medium">Price:</span> {price}
          </p>
          <p className="flex items-center gap-2">
            <Tag size={18} className="text-pink-500" />
            <span className="font-medium">Discount:</span> {discount}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <Link
            href={`/courses`}
            className="bg-main hover:bg-main mt-5 inline-block rounded px-4 py-1.5 text-white transition-colors"
          >
            Go Back
          </Link>

          {isSignedIn ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="bg-main cursor-pointer hover:bg-main mt-5 inline-block rounded px-4 py-1.5 text-white transition-colors" variant="outline">Enrollment</button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Link
              href={`/sign-in`}
              className="mt-5 inline-block rounded bg-gray-500 px-4 py-1.5 text-white transition-colors hover:bg-gray-600"
            >
              Sign in to Enroll
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
