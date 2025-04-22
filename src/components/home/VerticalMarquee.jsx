import {
  BarChart2,
  Code2,
  Film,
  Globe,
  Megaphone,
  Palette,
} from "lucide-react";

import { Marquee } from "../magicui/marquee";

import { cn } from "@/lib/utils";

const subjects = [
  {
    name: "Web Development",
    slogan: "Build the digital future",
    icon: Code2,
    slug: "web-development",
  },
  {
    name: "Graphic Design",
    slogan: "Create visual stories",
    icon: Palette,
    slug: "graphic-design",
  },
  {
    name: "Video Editing",
    slogan: "Craft compelling narratives",
    icon: Film,
    slug: "video-editing",
  },
  {
    name: "SEO",
    slogan: "Master search visibility",
    icon: BarChart2,
    slug: "seo",
  },
  {
    name: "Digital Marketing",
    slogan: "Grow your online presence",
    icon: Megaphone,
    slug: "digital-marketing",
  },
  {
    name: "UI/UX Design",
    slogan: "Shape user experiences",
    icon: Globe,
    slug: "ui-ux-design",
  },
];

const firstRow = subjects.slice(0, subjects.length / 2);
const secondRow = subjects.slice(subjects.length / 2);

// eslint-disable-next-line no-shadow
const SubjectCard = ({ icon: Icon, name, slogan }) => {
  return (
    <div
      className={cn(
        "relative h-36 w-full cursor-pointer shadow-md overflow-hidden rounded-md border p-4 transition-all duration-300",
        // light styles
        "bg-light-bg hover:shadow-lg",
        // dark styles
        "dark:hover:border-main dark:bg-dark-bg",
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-main/10 dark:bg-main/20 flex h-10 w-10 items-center justify-center rounded-full">
            <Icon className="text-main h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 sm:text-base dark:text-white">
            {name}
          </h3>
        </div>
        <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-300">
          {slogan}
        </p>
        <div className="text-main flex items-center text-xs font-medium sm:text-sm">
          Explore
          <svg
            className="ml-1 h-3 w-3 transition-transform sm:h-4 sm:w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default function VerticalMarquee() {
  return (
    <div className="relative shadow-lg flex h-[400px] w-full flex-row items-center justify-center overflow-hidden rounded-lg border">
      <Marquee pauseOnHover vertical className="gap-4 [--duration:20s]">
        {firstRow.map((subject) => (
          <SubjectCard key={subject.slug} {...subject} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="gap-4 [--duration:20s]">
        {secondRow.map((subject) => (
          <SubjectCard key={subject.slug} {...subject} />
        ))}
      </Marquee>
      {/* <div className="from-light-bg dark:from-black pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
      <div className="from-light-bg dark:from-black pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div> */}
    </div>
  );
}
