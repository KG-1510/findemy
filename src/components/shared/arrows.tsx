import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
const NextArrow = (props): JSX.Element => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="rounded-full hover:opacity-80 bg-primaryblack text-white border border-gray-500 absolute z-40 top-12 lg:top-28 -right-4 lg:-right-5 w-8 lg:w-10 h-8 lg:h-10 flex items-center justify-center cursor-pointer"
    >
      <FiChevronRight size={36} className="mx-auto" />
    </div>
  );
};

const PrevArrow = (props): JSX.Element => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="rounded-full hover:opacity-80 bg-primaryblack text-white border border-gray-500 absolute z-40 top-12 lg:top-28 -left-4 lg:-left-5 w-8 lg:w-10 h-8 lg:h-10 flex items-center justify-center cursor-pointer"
    >
      <FiChevronLeft size={36} className="mx-auto" />
    </div>
  );
};

export { NextArrow, PrevArrow };
