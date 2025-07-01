import Image from "next/image";
import Link from "next/link";

export default function EduLogo() {
  return (
    <>
      <Link href="/" className="flex items-center gap-2 text-3xl">
        <Image
          src="/Edu-logo.png"
          alt="EduGenius Logo"
          width={28}
          height={28}
        />
        <h2 className="text-2xl font-semibold">
          Edu<span className="text-main">Genius</span>
        </h2>
      </Link>
    </>
  );
}
