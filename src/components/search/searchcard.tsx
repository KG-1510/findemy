import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import MarkdownView from "react-showdown";
import {
  getUserCart,
  getUserProfile,
  postAddCart,
  successHandler,
} from "../../utils/api";
import { SearchcardProps } from "../../utils/interface";
import { sanitizedHtmlText } from "../../utils/functions";

const Searchcard = ({
  id,
  imageurl,
  title,
  courseSlug,
  instructorName,
  description,
  rating,
  votes,
  price,
  oldPrice,
  tag,
  category,
  level,
}: SearchcardProps): JSX.Element => {
  const [cookie, _] = useCookies(["authToken"]);
  const [cartCourseExists, setCartCourseExists] = useState<boolean>(false);
  const [coursePurchased, setCoursePurchased] = useState<boolean>(false);

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

  let sanitizedCourseDescription;
  if (description) {
    sanitizedCourseDescription = sanitizedHtmlText(description);
  }

  return (
    <>
      <Link to={`/coursedetails/${courseSlug}`}>
        <div className="w-full flex flex-col lg:flex-row pt-3 pb-6 border-b border-gray-300">
          <div className="w-full lg:w-5/12">
            <img className="mx-auto" src={imageurl} alt={title} />
          </div>
          <div className="flex flex-col w-full px-3">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <h1 className="font-semibold text-lg">{title}</h1>
                <p className="text-xs lg:text-sm font-normal card-title pr-1">
                  <MarkdownView
                    className="text-sm font-normal"
                    style={{ whiteSpace: "pre-line" }}
                    markdown={sanitizedCourseDescription}
                  />
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-primaryblack font-bold text-lg">
                  ₹{price}
                </span>
                <span className="text-gray-500 font-light text-sm line-through">
                  ₹{oldPrice}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-normal">
              {instructorName}
            </p>
            <div className="flex flex-row space-x-1 justify-start">
              <h3 className="text-orange-800 font-bold pt-1 text-sm flex items-center justify-center">
                {rating}
              </h3>
              <div>
                <StarRatings
                  rating={parseFloat(rating)}
                  starRatedColor="orange"
                  numberOfStars={5}
                  starDimension="15px"
                  starSpacing="0px"
                  name="courserating"
                />
              </div>
              <h3 className="text-xs text-gray-700 font-light pt-1 flex items-center justify-center">
                ({votes})
              </h3>
            </div>
            <p className="text-xs text-gray-500 font-normal">
              40 hours • 123 lectures • {level} • {category}
            </p>
            <div className="w-full flex flex-row justify-between items-center my-1">
              {tag === "Bestseller" && (
                <div>
                  <p className="bg-[#ECEB98] w-16 font-bold text-xs py-0.5 px-1">
                    Bestseller
                  </p>
                </div>
              )}
              {tag === "Coding Exercises" && (
                <div>
                  <p className="bg-[#CEBFFC] w-28 font-bold text-xs py-0.5 px-1">
                    Coding Exercises
                  </p>
                </div>
              )}

              {coursePurchased ? (
                <div className="w-full text-right mt-2 lg:mt-0">
                  <Link to={`/coursedetails/${courseSlug}`}>
                    <button className="p-2 bg-findemypurple hover:opacity-90 w-8/12 lg:w-4/12 text-white font-semibold text-sm">
                      <span className="flex flex-row text-center w-full items-center justify-center">
                        ✓ Start learning
                      </span>
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="w-full text-right mt-2 lg:mt-0">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addCourseToCart();
                    }}
                    disabled={cartCourseExists}
                    className={`${
                      cartCourseExists && "cursor-not-allowed opacity-70"
                    } p-2 bg-findemypurple hover:opacity-90 w-8/12 lg:w-4/12 text-white font-semibold text-sm`}
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
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Searchcard;
