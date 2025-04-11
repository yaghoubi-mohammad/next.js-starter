/* eslint-disable @typescript-eslint/no-explicit-any */
const StepsTitleBox = ({ number, title }: any) => {
  return (
    <div className="relative flex flex-col justify-center items-center">
      <section className="font-semibold bg-gradient-to-t dark:to-gray-800 dark:from-gray-950 to-[#dadada] from-[#ebebeb] flex flex-col items-center justify-center dark:text-white text-black">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_34px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </section>
      <span className="h-[100px] bg-gradient-to-b from-black to-octa-base-100 pr-[1px] w-[1px] mx-auto z-20"></span>
      <span className="z-20 rounded-full w-10 h-10 bg-gradient-to-b from-octa-dark-50 to-octa-dark-300 flex justify-center items-center text-lg font-displayBold mb-7">
        {number}
      </span>
      <span className="font-displayBold text-4xl font-bold z-20">{title}</span>
    </div>
  );
};

export default StepsTitleBox;
