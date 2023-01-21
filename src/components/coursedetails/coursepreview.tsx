import {
  AiFillPlayCircle,
  AiOutlineHeart,
  AiOutlineTrophy,
} from "react-icons/ai";
import { MdOndemandVideo } from "react-icons/md";
import { HiOutlineFolderDownload } from "react-icons/hi";
import { IoIosInfinite } from "react-icons/io";
import { BiMobileAlt } from "react-icons/bi";
import {
  errorHandler,
  getUserCart,
  getUserProfile,
  postAddCart,
  successHandler,
} from "../../utils/api";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clientBaseUrl, streamable_courses } from "../../utils/constants";

interface CoursepreviewProps {
  //   onCardClick: () => void;
  //   link: activeLinkProps;
  //   onDeleteCard: (_id: string, closeModal: () => void) => void;
  price: number;
  imageurl: string;
  courseSlug: string;
  isGiftedCourse?: string;
}

const Coursepreview = ({
  price,
  imageurl,
  courseSlug,
  isGiftedCourse,
}: CoursepreviewProps): JSX.Element => {
  const [cookie, _] = useCookies(["authToken"]);
  const [cartCourseExists, setCartCourseExists] = useState<boolean>(false);
  const [coursePurchased, setCoursePurchased] = useState<boolean>(false);
  const [isPreviewFixed, setIsPreviewFixed] = useState<boolean>(false);
  const [isCollidedFooter, setIsCollidedFooter] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const backendBaseUrl: string = process.env.REACT_APP_BACKEND_BASE_URL;

  const listenToScroll = () => {
    let heightToSetFixed = 300;
    let heightToUnsetFixed = document.documentElement.scrollHeight - 1200;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToUnsetFixed) {
      setIsCollidedFooter(true);
    } else {
      setIsCollidedFooter(false);
    }

    if (winScroll > heightToSetFixed && winScroll < heightToUnsetFixed) {
      setIsPreviewFixed(true);
    } else {
      setIsPreviewFixed(false);
    }
  };

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
        return true;
      }
    } else {
      successHandler("Hold on, login to continue!");
      navigate("/login");
    }
  };

  const handleBuyNow = async () => {
    const cartAddSuccess = await addCourseToCart();
    if (cartAddSuccess) {
      navigate("/checkout");
    }
  };

  const copyToClipBoard = async (copyMe: string) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      successHandler("📋 Link copied to clipboard!");
    } catch (err) {
      errorHandler(err);
    }
  };
  return (
    <>
      <div
        className={`block ${
          isPreviewFixed
            ? `lg:fixed z-50 top-20 animate-fadeIn`
            : `lg:absolute z-40 ${
                isCollidedFooter ? "bottom-96 mb-80" : "top-28"
              }`
        } right-20 bg-primaryblack lg:bg-white text-white lg:text-primaryblack w-full lg:w-3/12 h-auto lg:h-72 border-none lg:border lg:border-white lg:drop-shadow-md`}
      >
        {!coursePurchased ? (
          <img
            alt="img"
            className="border border-white w-full"
            src={imageurl}
          />
        ) : (
          <>
            <div className="video-responsive">
              {streamable_courses.includes(courseSlug) ? (
                <>
                  <video id="videoPlayer" controls={true}>
                    <source
                      src={`${backendBaseUrl}/courses/stream/coursevideo/${courseSlug}`}
                      type="video/mp4"
                    />
                  </video>
                </>
              ) : (
                <>
                  <iframe
                    width="475"
                    height="280"
                    src={`https://www.youtube.com/embed/HGgyd1bYWsE`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded YouTube iFrame for sample video"
                  />
                </>
              )}
            </div>
          </>
        )}
        <div className="p-6 bg-primaryblack lg:bg-white">
          {!coursePurchased ? (
            <>
              <h1 className="text-4xl font-bold mb-4">₹{price}</h1>
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
              <div>
                {isGiftedCourse ? (
                  <p className="text-center">
                    🎁 You have been gifted this course, start learning!
                  </p>
                ) : (
                  <p className="text-center">
                    🎉 You have purchased this course, start learning!
                  </p>
                )}
                <div className="flex items-center justify-center w-full">
                  <Link to={`/streamcourse/${courseSlug}`}>
                    <button className="flex flex-row items-center p-3 bg-findemypurple hover:opacity-90 w-full my-3 text-white font-semibold text-sm">
                      <AiFillPlayCircle className="mx-1" size={20} />
                      Start streaming!
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col mt-2">
            <p>This course includes:</p>
            <div className="flex flex-col mb-2">
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
            <p
              onClick={() =>
                copyToClipBoard(`${clientBaseUrl}/coursedetails/${courseSlug}`)
              }
              className="underline hover:text-findemypurple cursor-pointer"
            >
              Share
            </p>
            <Link to={`/giftcourse/${courseSlug}`}>
              <p className="underline hover:text-findemypurple cursor-pointer">
                Gift this course
              </p>
            </Link>
            <p className="underline hover:text-findemypurple cursor-pointer">
              Apply coupon
            </p>
          </div>
        </div>
      </div>
      <div className="fixed lg:hidden bottom-0 w-full flex p-3 flex-row items-center justify-between h-16 bg-white shadow-inner">
        <h1 className="text-lg font-bold w-1/5 flex items-center justify-center">
          ₹{price}
        </h1>
        <div className="w-full flex flex-row justify-end space-x-2">
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
        </div>
      </div>
    </>
  );
};

export default Coursepreview;
