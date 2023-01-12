import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
const NextArrow = (props): JSX.Element => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="rounded-full bg-primaryblack text-white absolute z-50 top-12 lg:top-28 -right-4 lg:-right-12 w-10 lg:w-12 h-10 lg:h-12 flex items-center justify-center cursor-pointer"
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
      className="rounded-full bg-primaryblack text-white absolute z-50 top-12 lg:top-28 -left-4 lg:-left-12 w-10 lg:w-12 h-10 lg:h-12 flex items-center justify-center cursor-pointer"
    >
      <FiChevronLeft size={36} className="mx-auto" />
    </div>
  );
};

export { NextArrow, PrevArrow };
