import { BarChart2, Code2, Film, Megaphone, Palette } from "lucide-react";

import { OrbitingCircles } from "../magicui/orbiting-circles";

export default function OrbitingCircle() {
  return (
    <div className="bg-light-bg dark:bg-dark-bg rounded-lg relative flex h-[400px] w-full flex-col items-center justify-center border overflow-hidden">
      {/* Main orbiting circles with larger icons */}
      <OrbitingCircles speed={0.5} iconSize={40}>
        <CourseIcon icon={Code2} color="text-blue-500" />
        <CourseIcon icon={Palette} color="text-purple-500" />
        <CourseIcon icon={Film} color="text-red-500" />
        <CourseIcon icon={BarChart2} color="text-green-500" />
        <CourseIcon icon={Megaphone} color="text-yellow-500" />
      </OrbitingCircles>

      {/* Secondary orbiting circles with smaller icons */}
      <OrbitingCircles iconSize={30} radius={100} reverse speed={1}>
        <CourseIcon icon={Code2} color="text-blue-400" />
        <CourseIcon icon={Palette} color="text-purple-400" />
        <CourseIcon icon={Film} color="text-red-400" />
        <CourseIcon icon={BarChart2} color="text-green-400" />
        <CourseIcon icon={Megaphone} color="text-yellow-400" />
      </OrbitingCircles>
    </div>
  );
}

const CourseIcon = ({ icon: Icon, color }) => {
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-full bg-white p-3 shadow-lg dark:bg-dark-hover ${color}`}
    >
      <Icon className="h-8 w-8" />
    </div>
  );
};
