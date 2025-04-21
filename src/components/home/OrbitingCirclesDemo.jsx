import { IconTable } from "@tabler/icons-react";

import { OrbitingCircles } from "../magicui/orbiting-circles";

export function OrbitingCirclesDemo() {
  // Single icon component that you can change in one place
  const TableIcon = IconTable;

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      {/* Main Orbit - All circles use the same icon */}
      <OrbitingCircles iconSize={40}>
        <TableIcon />
        <TableIcon />
        <TableIcon />
        <TableIcon />
        <TableIcon />
      </OrbitingCircles>

      {/* Secondary Orbit */}
      <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
        <TableIcon />
        <TableIcon />
        <TableIcon />
        <TableIcon />
      </OrbitingCircles>
    </div>
  );
}
