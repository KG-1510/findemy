import StarRatings from "react-star-ratings";

interface CartcardProps {
  //   onCardClick: () => void;
  //   link: activeLinkProps;
  //   onDeleteCard: (_id: string, closeModal: () => void) => void;
  id: number;
  imageurl: string;
  title: string;
  instructorName: string;
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
  instructorName,
  rating,
  votes,
  price,
  oldPrice,
  tag,
  category,
  level,
}: CartcardProps): JSX.Element => {
  return (
    <>
      <div className="w-full flex flex-col h-full lg:h-36 lg:flex-row pt-3 pb-6 border border-gray-300">
        <img className="mx-auto px-1" width={160} src={imageurl} alt={title} />
        <div className="flex flex-col w-full px-3">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h1 className="font-semibold text-lg">{title}</h1>
              <p className="text-sm font-normal">
                Here is the description for this course on Findemy - Learn
                Anytime! Anywhere!
              </p>
            </div>
            <div className="flex flex-col px-1">
              <button className="text-xs font-normal text-findemypurple bg-white hover:opacity-80 my-1">
                Remove
              </button>
              <button className="text-xs font-normal text-findemypurple bg-white hover:opacity-80 my-1">
                Move to Wishlist
              </button>
            </div>
            <div className="flex flex-col">
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
            <div className="my-1 w-16">
              {tag === "Bestseller" && (
                <div>
                  <p className="bg-[#ECEB98] font-bold text-xs py-0.5 px-1">
                    Bestseller
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
            40 hours • 123 lectures • {level}
          </p>
        </div>
      </div>
    </>
  );
};

export default Cartcard;
