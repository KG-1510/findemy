import { AiOutlineHeart, AiOutlineTrophy } from "react-icons/ai";
import { MdOndemandVideo } from "react-icons/md";
import { HiOutlineFolderDownload } from "react-icons/hi";
import { IoIosInfinite } from "react-icons/io";
import { BiMobileAlt } from "react-icons/bi";
import {
  getUserCart,
  getUserProfile,
  postAddCart,
  successHandler,
} from "../../utils/api";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CoursepreviewProps {
  //   onCardClick: () => void;
  //   link: activeLinkProps;
  //   onDeleteCard: (_id: string, closeModal: () => void) => void;
  price: number;
  imageurl: string;
  courseSlug: string;
}

const Coursepreview = ({
  price,
  imageurl,
  courseSlug,
}: CoursepreviewProps): JSX.Element => {
  const [cookie, _] = useCookies(["authToken"]);
  const [cartCourseExists, setCartCourseExists] = useState<boolean>(false);
  const [coursePurchased, setCoursePurchased] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (cookie?.authToken) {
      const _data = JSON.parse(localStorage.getItem("userData"));
      courseExistsInCart(_data?._id);
      courseEnrolledByUser(_data?._id);
    }
  });

  const courseExistsInCart = async (userId: string) => {
    const _res = await getUserCart(cookie?.authToken, userId);
    if (_res) {
      if (_res?.data?.cart?.some((item) => item.courseSlug === courseSlug)) {
        setCartCourseExists(true);
      }
    }
  };

  const courseEnrolledByUser = async (userId: string) => {
    const _res = await getUserProfile(cookie?.authToken, userId);
    if (_res) {
      if (
        _res?.data?.coursesEnrolled?.some(
          (item) => item.courseSlug === courseSlug
        )
      ) {
        setCoursePurchased(true);
      }
    }
  };

  const addCourseToCart = async () => {
    if (cookie?.authToken) {
      const _data = JSON.parse(localStorage.getItem("userData"));
      const _res = await postAddCart(cookie?.authToken, _data?._id, courseSlug);
      if (_res) {
        successHandler("Added to cart successfully! 🎉");
        courseExistsInCart(_data?._id);
      }
    }
  };

  const handleBuyNow = async () => {
    addCourseToCart();
    navigate("/checkout");
  };
  return (
    <>
      <div className="block lg:absolute top-28 right-10 bg-primaryblack lg:bg-white text-white lg:text-primaryblack w-full lg:w-4/12 h-auto lg:h-72 border-none lg:border lg:border-white lg:drop-shadow-md">
        {!coursePurchased ? (
          <img alt="img" src={imageurl} />
        ) : (
          <>
            <div className="video-responsive">
              <iframe
                width="475"
                height="280"
                src={`https://www.youtube.com/embed/HGgyd1bYWsE`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
          </>
        )}
        <div className="p-6 bg-primaryblack lg:bg-white">
          {!coursePurchased ? (
            <>
              <h1 className="text-4xl font-bold mt-2 mb-4">₹{price}</h1>
              <div className="w-full flex flex-row space-x-2">
                <button
                  onClick={() => addCourseToCart()}
                  disabled={cartCourseExists}
                  className={`${
                    cartCourseExists && "cursor-not-allowed opacity-70"
                  } p-2 bg-findemypurple hover:opacity-90 w-11/12 text-white font-semibold text-lg`}
                >
                  {cartCourseExists ? (
                    <span className="flex flex-row text-center w-full items-center justify-center">
                      ✓ Added to cart!
                    </span>
                  ) : (
                    <>Add to cart</>
                  )}
                </button>

                <button
                  onClick={() => successHandler("Moved to your wishlist! ❤️ ")}
                  className="border border-white lg:border-primaryblack w-12 flex items-center justify-center hover:bg-[#F5F5F5]"
                >
                  <AiOutlineHeart className="h-6 w-6" />
                </button>
              </div>
              <button
                onClick={() => handleBuyNow()}
                className="border border-white lg:border-primaryblack text-lg h-10 font-bold w-full mt-2 hover:bg-[#F5F5F5]"
              >
                Buy now
              </button>
              <p className="text-xs font-light w-full text-center my-3">
                {" "}
                30-Day Money-Back Guarantee
              </p>
            </>
          ) : (
            <>
              <p className="text-center">
                🎉 You have purchased this course, start learning!
              </p>
            </>
          )}

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
