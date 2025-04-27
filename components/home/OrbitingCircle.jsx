import { BarChart2, Code2, Film, Megaphone, Palette } from "lucide-react";

import { OrbitingCircles } from "../magicui/orbiting-circles";

import { cn } from "@/lib/utils";

// Updated color map for better dark mode contrast
const colorMap = {
  "text-sky-400": "dark:text-sky-400",
  "text-fuchsia-400": "dark:text-fuchsia-400",
  "text-rose-400": "dark:text-rose-400",
  "text-emerald-400": "dark:text-emerald-400",
  "text-amber-300": "dark:text-amber-300",
};

export default function OrbitingCircle() {
  return (
    <div className="dark:bg-gradient-to-b from-black to-black relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
      {/* Main orbiting circles */}
      <OrbitingCircles speed={0.3} iconSize={40} radius={150}>
        <CourseIcon icon={Code2} color="text-sky-400" />
        <CourseIcon icon={Palette} color="text-fuchsia-400" />
        <CourseIcon icon={Film} color="text-rose-400" />
        <CourseIcon icon={BarChart2} color="text-emerald-400" />
        <CourseIcon icon={Megaphone} color="text-amber-300" />
      </OrbitingCircles>

      {/* Secondary orbiting circles */}
      <OrbitingCircles iconSize={30} radius={90} reverse speed={.5}>
        <CourseIcon icon={Code2} color="text-sky-400" />
        <CourseIcon icon={Palette} color="text-fuchsia-400" />
        <CourseIcon icon={Film} color="text-rose-400" />
        <CourseIcon icon={BarChart2} color="text-emerald-400" />
        <CourseIcon icon={Megaphone} color="text-amber-300" />
      </OrbitingCircles>
    </div>
  );
}

const CourseIcon = ({ icon: Icon, color }) => {
  return (
    <div
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full p-3 shadow-lg",
        "from-medium-bg to-dark-main bg-gradient-to-b",
        "dark:from-dark-bg/70 dark:to-dark-main",
        "text-white",
        colorMap[color],
      )}
    >
      <Icon className="h-8 w-8" />
    </div>
  );
};
