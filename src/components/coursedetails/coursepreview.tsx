import { AiOutlineHeart, AiOutlineTrophy } from "react-icons/ai";
import { MdOndemandVideo } from "react-icons/md";
import { HiOutlineFolderDownload } from "react-icons/hi";
import { IoIosInfinite } from "react-icons/io";
import { BiMobileAlt } from "react-icons/bi";

interface CoursepreviewProps {
  //   onCardClick: () => void;
  //   link: activeLinkProps;
  //   onDeleteCard: (_id: string, closeModal: () => void) => void;
  price: number;
  imageurl: string;
}

const Coursepreview = ({
  price,
  imageurl,
}: CoursepreviewProps): JSX.Element => {
  return (
    <>
      <div className="block lg:absolute top-28 right-10 bg-primaryblack lg:bg-white text-white lg:text-primaryblack w-full lg:w-4/12 h-auto lg:h-72 border-none lg:border lg:border-white lg:drop-shadow-md">
        <img alt="img" src={imageurl}></img>
        <div className="p-6 bg-primaryblack lg:bg-white">
          <h1 className="text-4xl font-bold mt-2 mb-4">₹{price}</h1>
          <div className="w-full flex flex-row space-x-2">
            <button className="p-2 bg-findemypurple hover:opacity-90 w-11/12 text-white font-semibold text-lg">
              Add to cart
            </button>
            <button className="border border-white lg:border-primaryblack w-12 flex items-center justify-center hover:bg-[#F5F5F5]">
              <AiOutlineHeart className="h-6 w-6" />
            </button>
          </div>
          <button className="border border-white lg:border-primaryblack text-lg h-10 font-bold w-full mt-2 hover:bg-[#F5F5F5]">
            Buy now
          </button>
          <p className="text-xs font-light w-full text-center my-3">
            {" "}
            30-Day Money-Back Guarantee
          </p>
          <div className="flex flex-col mt-6">
            <p>This course includes:</p>
            <div className="flex flex-col mb-5">
              <div className="flex flex-row space-x-3 my-1">
                <MdOndemandVideo size={20} />
                <p className="text-sm font-light">5.5 hours on-demand video</p>
              </div>
              <div className="flex flex-row space-x-3 my-1">
                <HiOutlineFolderDownload size={20} />
                <p className="text-sm font-light">70 downloadable resources</p>
              </div>
              <div className="flex flex-row space-x-3 my-1">
                <IoIosInfinite size={20} />
                <p className="text-sm font-light">Full lifetime access</p>
              </div>
              <div className="flex flex-row space-x-3 my-1">
                <BiMobileAlt size={20} />
                <p className="text-sm font-light">Access on mobile and TV</p>
              </div>
              <div className="flex flex-row space-x-3 my-1">
                <AiOutlineTrophy size={20} />
                <p className="text-sm font-light">Certificate of completion</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full justify-around">
            <p className="underline hover:text-findemypurple cursor-pointer">
              Share
            </p>
            <p className="underline hover:text-findemypurple cursor-pointer">
              Gift this course
            </p>
            <p className="underline hover:text-findemypurple cursor-pointer">
              Apply coupon
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coursepreview;
