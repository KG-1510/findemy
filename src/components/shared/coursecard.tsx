import StarRatings from "react-star-ratings";

interface CoursecardProps {
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

const Coursecard = ({
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
}: CoursecardProps): JSX.Element => {
  return (
    <>
      <div
        key={id}
        className="flex flex-col w-full items-start space-y-[1px] hover:cursor-pointer"
      >
        <img src={imageurl} alt={title} className="h-full w-full" />
        <h2 className="font-bold text-lg leading-5 pt-1">{title}</h2>
        <h2 className="text-xs text-gray-700 font-light">{instructorName}</h2>
        <div className="flex flex-row space-x-1">
          <h3 className="text-orange-800 pt-1 font-bold text-sm flex items-center justify-center">
            {rating}
          </h3>
          <div className="w-full">
            <StarRatings
              rating={parseFloat(rating)}
              starRatedColor="orange"
              numberOfStars={5}
              starDimension="15px"
              starSpacing="0px"
              name="courserating"
            />
          </div>
          <h3 className="text-xs text-gray-700 pt-1 font-light flex items-center justify-center">
            ({votes})
          </h3>
        </div>
        <div className="flex items-center">
          <h3 className="text-primaryblack font-bold text-lg">₹{price}</h3>
          <h3 className="text-gray-500 font-light text-sm line-through px-2">
            ₹{oldPrice}
          </h3>
        </div>
        <div className="my-1">
          {tag === "Bestseller" && (
            <div>
              <p className="bg-[#ECEB98] font-bold text-xs py-0.5 px-1">Bestseller</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Coursecard;
