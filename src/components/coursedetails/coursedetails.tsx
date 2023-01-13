import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";
import { AiOutlineFieldTime } from "react-icons/ai";
import { VscGlobe } from "react-icons/vsc";

import { AiFillStar, AiFillPlayCircle } from "react-icons/ai";
import { HiCheckBadge, HiUsers } from "react-icons/hi2";

// TODO: To replace with API call of searched items
import coursedetails from "../../dummy/coursedetails.json";
import { NavbarComponent, FooterComponent } from "../shared";
import { CoursepreviewComponent } from ".";

interface CoursedetailsProps {
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
  learningOutcomes: String[];
  requirements: String[];
  description: string;
  instructorProfession: string;
  instructorImg: string;
  instructorDescription: string;
}

const Coursedetailspage = (): JSX.Element => {
  const params = useParams();

  // TODO: Replace dummy data with API call
  const coursedata: CoursedetailsProps = coursedetails.find(
    (item) => item.id === parseInt(params.courseId)
  );
  return (
    <>
      <NavbarComponent />
      <div className="w-full">
        <CoursepreviewComponent price={coursedata.price} />
        <div className="bg-primaryblack w-full text-white">
          <div className="py-10 px-4 lg:px-32 w-full lg:w-8/12">
            <h1 className="font-bold text-3xl">{coursedata.title}</h1>
            <p className="font-light text-lg my-2">
              The course you were always looking for!
            </p>

            <div className="flex flex-row space-x-1 justify-start mt-3">
              <div className="my-1 w-16">
                {coursedata.tag === "Bestseller" && (
                  <div>
                    <p className="bg-[#ECEB98] text-primaryblack font-bold text-xs py-0.5 px-1">
                      Bestseller
                    </p>
                  </div>
                )}
              </div>
              <h3 className="text-orange-400 font-bold pt-1 text-sm flex items-center justify-center">
                {coursedata.rating}
              </h3>
              <div>
                <StarRatings
                  rating={parseFloat(coursedata.rating)}
                  starRatedColor="orange"
                  numberOfStars={5}
                  starDimension="15px"
                  starSpacing="0px"
                  name="courserating"
                />
              </div>
              <h3 className="text-xs text-purple-300 underline font-light pt-1 flex items-center justify-center">
                1,855 ratings
              </h3>
              <h3 className="text-xs text-white font-light pt-1 flex items-center justify-center">
                ({coursedata.votes})
              </h3>
            </div>

            <div className="font-light text-sm my-2">
              <p>
                Created by{" "}
                <span className="text-purple-300 underline">
                  {coursedata.instructorName}
                </span>
              </p>
            </div>

            <div className="font-light text-sm my-2 flex flex-row">
              <p className="flex flex-row items-center justify-center">
                <AiOutlineFieldTime className="mr-1" size={20} />
                Last Updated 01/2023
              </p>
              <p className="flex flex-row items-center justify-center mx-2">
                <VscGlobe className="mr-1" size={20} />
                English
              </p>
            </div>
          </div>
        </div>

        <div className="h-full py-10 px-4 lg:pl-32 lg:pr-20 w-full lg:w-8/12">
          <div className="border border-1 p-4">
            <div>
              <h1 className="font-bold text-2xl mb-4">What you'll learn</h1>
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {coursedata.learningOutcomes.map((item, i) => {
                return (
                  <li className="text-gray-500 font-light text-base" key={i}>
                    ✓ {item}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="my-4">
            <div>
              <h1 className="font-bold text-2xl mb-4">Requirements</h1>
            </div>
            <ul>
              {coursedata.requirements.map((item, i) => {
                return (
                  <li
                    className="text-primaryblack font-light text-base my-2"
                    key={i}
                  >
                    • {item}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-8">
            <div>
              <h1 className="font-bold text-2xl mb-4">Description</h1>
            </div>
            <p className="text-sm font-light">{coursedata.description}</p>
          </div>

          <div className="mt-8">
            <div>
              <h1 className="font-bold text-2xl mb-4">Instructor</h1>
            </div>
            <p className="text-lg font-bold text-findemypurple underline">
              {coursedata.instructorName}
            </p>
            <p className="text-base font-light text-gray-500">
              {coursedata.instructorProfession}
            </p>
            <div className="flex flex-row my-3">
              <img
                className="w-32 h-32 rounded-full"
                src={coursedata.instructorImg}
                alt={coursedata.instructorName}
              />
              <div className="flex flex-col mb-5 mx-4">
                <div className="flex flex-row space-x-3 my-1">
                  <AiFillStar size={20} />
                  <p className="text-sm font-light">4.7 Instructor Rating</p>
                </div>
                <div className="flex flex-row space-x-3 my-1">
                  <HiCheckBadge size={20} />
                  <p className="text-sm font-light">2,944 Reviews</p>
                </div>
                <div className="flex flex-row space-x-3 my-1">
                  <HiUsers size={20} />
                  <p className="text-sm font-light">10,485 Students</p>
                </div>
                <div className="flex flex-row space-x-3 my-1">
                  <AiFillPlayCircle size={20} />
                  <p className="text-sm font-light">3 Courses</p>
                </div>
              </div>
            </div>
              <p className="font-light text-sm">{coursedata.instructorDescription}</p>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default Coursedetailspage;
