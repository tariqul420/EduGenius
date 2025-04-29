import Image from "next/image";

function Title({ badge, title, subTitle }) {
  return (
    <div className="heading-title relative mx-auto pb-4 md:pb-8 text-center text-2xl md:text-3xl lg:text-4xl">
      <p className="dark:from-dark-theme from-medium-bg to-white dark:to-dark-bg relative mx-auto md:mb-3 w-fit overflow-hidden rounded-3xl border bg-gradient-to-r px-5 py-1.5 text-xs uppercase">
        <Image
          className="absolute right-0 -bottom-1 left-0 mx-auto"
          src="/star-blaze.png"
          alt="btnBg"
          width={100}
          height={100}
        />
        {badge}
      </p>
      <div className="relative mx-auto w-fit overflow-hidden sm:overflow-visible">
        <h2 className="from-main to-dark-btn mx-auto mt-2.5 w-fit bg-gradient-to-r bg-clip-text text-transparent  font-medium">
          {title}
        </h2>
        <span className="right-line to-main absolute top-[20px] -right-30 h-[1.5px] w-[100px] rounded bg-gradient-to-l from-transparent md:-right-50 md:w-[150px] lg:-right-60 lg:w-[200px]"></span>
        <span className="right-line to-main absolute top-[20px] -left-30 h-[1.5px] w-[100px] rounded bg-gradient-to-r from-transparent md:-left-50 md:w-[150px] lg:-left-60 lg:w-[200px]"></span>
      </div>

      <p className="mx-auto mt-1.5 md:mt-2.5 w-fit dark:text-medium-bg text-sm sm:text-base">
        {subTitle}
      </p>
    </div>
  );
}

export default Title;
