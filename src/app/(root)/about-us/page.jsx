import { BookOpen, MessageSquareQuote, Target, Users } from "lucide-react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-main mb-10 text-center text-2xl md:text-5xl">
        Meet Our Team
      </h1>
      <div className="items-center justify-between gap-2 md:flex">
        <div>
          <Image
            src="/testomonial1.jpg"
            alt="Hero Image"
            width={300}
            height={300}
            className="rounded-lg object-cover"
          />
          <p className="py-2 text-2xl">Rashedul Islam</p>
        </div>
        <div>
          <Image
            src="/testomonial1.jpg"
            alt="Hero Image"
            width={300}
            height={300}
            className="items-center rounded-lg object-cover"
          />
          <p className="py-2 text-2xl">Rashedul Islam</p>
        </div>
        <div>
          <Image
            src="/testomonial1.jpg"
            alt="Hero Image"
            width={300}
            height={300}
            className="rounded-lg object-cover"
          />
          <p className="py-2 text-2xl">Rashedul Islam</p>
        </div>
        <div>
          <Image
            src="/testomonial1.jpg"
            alt="Hero Image"
            width={300}
            height={300}
            className="rounded-lg object-cover"
          />
          <p className="py-2 text-2xl">Rashedul Islam</p>
        </div>
      </div>
      <div className="my-8 grid grid-cols-4 gap-4">
        <div className="col-span-4 space-y-4 lg:col-span-2">
          <h1 className="text-main text-3xl">Our mission</h1>
          <h1 className="text-3xl md:text-5xl">
            Inspire and empower the tech workforce to achieve their goals
          </h1>
          <p className="md:text-[18px]">
            We’re dreaming big, but our work is all about the details. After
            all, we get to a better tech workforce one skill, one process
            improvement, one technologist at a time. Find out how we&apos;re
            solving tech workforce challenges, boosting careers, and creating
            opportunity.
          </p>
        </div>
        <div className="col-span-4 lg:col-span-2">
          <Image
            src="/our mission.webp"
            alt="Hero Image"
            width={600}
            height={600}
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      <div className="py-16">
        <h1 className="text-main mb-12 text-center text-4xl font-bold">
          Overview of The EduGenius
        </h1>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-3">
          {/* Card 1 */}
          <div className="dark:bg-dark-bg flex flex-col items-center gap-2.5 rounded-md border bg-white px-2 py-3 text-center shadow dark:border-t-[3px] dark:border-b-0 dark:shadow-none">
            <h1 className="text-5xl font-bold text-green-600">3967+</h1>
            <p className="mt-2 text-xl">Positive Reviews</p>
          </div>

          {/* Card 2 */}
          <div className="dark:bg-dark-bg flex flex-col items-center gap-2.5 rounded-md border bg-white px-2 py-3 text-center shadow dark:border-t-[3px] dark:border-b-0 dark:shadow-none">
            <h1 className="text-5xl font-bold text-indigo-600">1000+</h1>
            <p className="mt-2 text-xl">Happy Customers</p>
          </div>

          {/* Card 3 */}
          <div className="dark:bg-dark-bg flex flex-col items-center gap-2.5 rounded-md border bg-white px-2 py-3 text-center shadow dark:border-t-[3px] dark:border-b-0 dark:shadow-none">
            <h1 className="text-5xl font-bold text-pink-600">1000+</h1>
            <p className="mt-2 text-xl">Purchased Courses</p>
          </div>
        </div>
      </div>
      <div className="my-8 grid grid-cols-4 gap-4">
        <div className="col-span-4 space-y-4 lg:col-span-2">
          <h1 className="text-main text-3xl">Meet the team</h1>
          <h1 className="text-3xl md:text-5xl">Our leadership</h1>
          <p className="md:text-[18px]">
            Our executives lead by example and guide us to accomplish great
            things every day. With experience across industries, their breadth
            and depth of expertise enable us to solve problems, realize our
            vision, and better serve our customers—and each other.
          </p>
        </div>
        <div className="col-span-4 lg:col-span-2">
          <Image
            src="/about-leadership-sec.webp"
            alt="Hero Image"
            width={600}
            height={600}
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      <div className="py-16">
        <h2 className="text-main mb-12 text-center text-4xl font-bold">
          Our Culture Pillars
        </h2>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:grid-cols-2">
          {/* Customer Obsessed */}
          <div className="dark:bg-dark-bg flex flex-col items-center gap-2.5 rounded-md border bg-white px-2 py-3 text-center shadow dark:border-t-[3px] dark:border-b-0 dark:shadow-none">
            <Users className="text-main h-10 w-10" />
            <div>
              <h3 className="mb-1 text-xl font-semibold">Student-Centered</h3>
              <p className="text-sm">
                EduGenius puts learners first. We analyze learner feedback,
                trends, and educational needs to deliver value beyond
                expectations.
              </p>
            </div>
          </div>

          {/* Aligned and Focused */}
          <div className="dark:bg-dark-bg flex flex-col items-center gap-2.5 rounded-md border bg-white px-2 py-3 text-center shadow dark:border-t-[3px] dark:border-b-0 dark:shadow-none">
            <Target className="h-10 w-10 text-green-600" />
            <div>
              <h3 className="mb-1 text-xl font-semibold">Mission-Driven</h3>
              <p className="text-sm">
                Every course, every feature, every improvement aligns with our
                goal of empowering learners through accessible education.
              </p>
            </div>
          </div>

          {/* Always Learning */}
          <div className="dark:bg-dark-bg flex flex-col items-center gap-2.5 rounded-md border bg-white px-2 py-3 text-center shadow dark:border-t-[3px] dark:border-b-0 dark:shadow-none">
            <BookOpen className="h-10 w-10 text-purple-600" />
            <div>
              <h3 className="mb-1 text-xl font-semibold">Always Improving</h3>
              <p className="text-sm">
                We adapt, iterate, and learn constantly—reviewing performance,
                industry trends, and user data to sharpen every learning
                experience.
              </p>
            </div>
          </div>

          {/* Direct and Respectful */}
          <div className="dark:bg-dark-bg flex flex-col items-center gap-2.5 rounded-md border bg-white px-2 py-3 text-center shadow dark:border-t-[3px] dark:border-b-0 dark:shadow-none">
            <MessageSquareQuote className="h-10 w-10 text-red-600" />
            <div>
              <h3 className="mb-1 text-xl font-semibold">Open Communication</h3>
              <p className="text-sm">
                We communicate with clarity and respect. Feedback is honest,
                timely, and aimed at uplifting both our team and learners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
