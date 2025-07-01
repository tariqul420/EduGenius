import {
  BarChart2,
  ChevronsRight,
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
        "relative h-36 w-full cursor-pointer overflow-hidden rounded-md border px-2 py-4 shadow-md transition-all duration-300 sm:px-4",
        // light styles
        "bg-white hover:shadow-lg",
        // dark styles
        "dark:hover:border-main/50 dark:bg-black",
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="bg-main/10 dark:bg-main/20 flex h-7 w-7 items-center justify-center sm:h-10 sm:w-10">
            <Icon className="text-main dark:text-dark-btn h-5 w-5" />
          </div>
          <h3 className="text-xs font-medium sm:text-base dark:text-white">
            {name}
          </h3>
        </div>
        <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-300">
          {slogan}
        </p>
        <div className="flex items-center gap-0.5 text-xs font-medium sm:text-sm dark:text-white">
          Explore
          <ChevronsRight className="text-dark-btn/90" size={18} />
        </div>
      </div>
    </div>
  );
};

export default function VerticalMarquee() {
  return (
    <div className="relative flex h-[400px] w-full flex-row items-center justify-center overflow-hidden rounded-lg">
      <Marquee
        pauseOnHover
        vertical
        className="gap-4 p-1 [--duration:20s] sm:p-2"
      >
        {firstRow.map((subject) => (
          <SubjectCard key={subject.slug} {...subject} />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        vertical
        className="gap-4 p-1 [--duration:20s] sm:p-2"
      >
        {secondRow.map((subject) => (
          <SubjectCard key={subject.slug} {...subject} />
        ))}
      </Marquee>
      <div className="dark:from-dark-theme pointer-events-none absolute inset-x-0 top-0 h-1/7 bg-gradient-to-b from-transparent"></div>
      <div className="dark:from-dark-theme pointer-events-none absolute inset-x-0 bottom-0 h-1/7 bg-gradient-to-t from-transparent"></div>
    </div>
  );
}
