import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import MarkdownView from "react-showdown";
import StarRatings from "react-star-ratings";
import { patchUserCart, successHandler } from "../../utils/api";
import { sanitizedHtmlText, truncateText } from "../../utils/functions";

interface CartcardProps {
  //   onCardClick: () => void;
  //   link: activeLinkProps;
  //   onDeleteCard: (_id: string, closeModal: () => void) => void;
  id: number;
  imageurl: string;
  title: string;
  courseSlug: string;
  instructorName: string;
  description: string;
  rating: string;
  votes: string;
  price: number;
  oldPrice: number;
  category: string;
  tag?: string;
  level?: string;
}

const Cartcard = ({
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
}: CartcardProps): JSX.Element => {
  const [cookie, _] = useCookies(["authToken"]);

  let sanitizedCourseDescription;
  if (description) {
    sanitizedCourseDescription = sanitizedHtmlText(description);
  }

  const navigate = useNavigate();

  const removeCartItem = async () => {
    if (cookie?.authToken) {
      const _data = JSON.parse(localStorage.getItem("userData"));
      const _res = await patchUserCart(
        cookie?.authToken,
        _data?._id,
        courseSlug
      );
      if (_res) {
        successHandler("Item removed from cart!");
        navigate(0);
      }
    }
  };
  return (
    <>
      <div
        key={id}
        className="w-full flex flex-col my-2 h-full lg:h-44 lg:flex-row pt-3 pb-6 border border-gray-300"
      >
        <img className="mx-auto px-1" src={imageurl} alt={title} />
        <div className="flex flex-col w-full px-3">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <Link to={`/coursedetails/${courseSlug}`}>
                <h1 className="font-semibold text-base hover:text-findemypurple lg:text-lg mt-2 lg:mt-0">
                  {title}
                </h1>
              </Link>
              <p className="hidden lg:block text-xs font-normal card-title h-10">
                <MarkdownView
                  className="text-sm font-normal"
                  style={{ whiteSpace: "pre-line" }}
                  markdown={truncateText(sanitizedCourseDescription, 80, 80)}
                />
              </p>
            </div>
            <div className="flex flex-col px-1 space-y-2 mt-2 lg:mt-0">
              <button
                onClick={() => removeCartItem()}
                className="text-xs font-normal text-findemypurple bg-white hover:opacity-80 my-1"
              >
                Remove
              </button>
              <button
                onClick={() => successHandler("Moved to your wishlist! ❤️")}
                className="text-xs font-normal text-findemypurple bg-white hover:opacity-80 my-1"
              >
                Move to Wishlist
              </button>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-findemypurple font-bold text-lg">
                ₹{price}
              </span>
              <span className="text-gray-500 font-light text-sm line-through px-2">
                ₹{oldPrice}
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-500 font-normal">
            By {instructorName}
          </p>
          <div className="flex flex-row space-x-1 justify-start">
            <div className="my-1">
              {tag === "Bestseller" && (
                <div>
                  <p className="bg-[#ECEB98] font-bold text-xs py-0.5 px-1">
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
            </div>
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
        </div>
      </div>
    </>
  );
};

export default Cartcard;
