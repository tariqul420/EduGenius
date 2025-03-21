import Image from "next/image";
const EmptyPage = () => {
    return (
        <div
            className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
            <Image width={100} height={100} src="https://i.ibb.co/m5DrBt1/Group-2.png" alt="empty/image" className="w-full sm:w-[200px]"/>

            <h1 className="text-[1.4rem] mt-6 font-[500] text-black">No Result</h1>

            <p className="text-[0.9rem] text-gray-500">Please Login to view more updates</p>
        </div>
    );
};

export default EmptyPage;
                    