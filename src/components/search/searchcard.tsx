import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

interface SearchcardProps {
  //   onCardClick: () => void;
  //   link: activeLinkProps;
  //   onDeleteCard: (_id: string, closeModal: () => void) => void;
  id: string;
  imageurl: string;
  title: string;
  courseSlug: string;
  instructorName: string;
  rating: string;
  votes: string;
  price: number;
  oldPrice: number;
  category: string;
  tag?: string;
  level?: string;
}

const Searchcard = ({
  id,
  imageurl,
  title,
  courseSlug,
  instructorName,
  rating,
  votes,
  price,
  oldPrice,
  tag,
  category,
  level,
}: SearchcardProps): JSX.Element => {
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
                <p className="text-sm font-normal">
                  Here is the description for this course on Findemy - Learn
                  Anytime! Anywhere!
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
              40 hours • 123 lectures • {level}
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
              <div className="w-full text-right mt-2 lg:mt-0">
                <button className="p-2 bg-findemypurple hover:opacity-90 w-8/12 lg:w-4/12 text-white font-semibold text-sm">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Searchcard;
