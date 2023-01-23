import StarRatings from "react-star-ratings";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineFieldTime } from "react-icons/ai";
import { VscGlobe } from "react-icons/vsc";

import { AiFillStar, AiFillPlayCircle } from "react-icons/ai";
import { HiCheckBadge, HiUsers } from "react-icons/hi2";

import {
  NavbarComponent,
  FooterComponent,
  SpinnerloaderComponent,
} from "../shared";
import { CoursepreviewComponent } from ".";
import { useEffect, useState } from "react";
import { getCourseDetails } from "../../utils/api";
import MarkdownView from "react-showdown";
import { sanitizedHtmlText, truncateText } from "../../utils/functions";

interface CoursedetailsProps {
  id: number;
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
  learningOutcomes: String[];
  requirements: String[];
  description: string;
  instructorProfession: string;
  instructorImg: string;
  instructorDescription: string;
  isGiftedCourse?: string;
}

const Coursedetailspage = (): JSX.Element => {
  const params = useParams();
  const navigate = useNavigate();

  const [courseDetailsData, setCourseDetailsData] =
    useState<CoursedetailsProps>();
  const [isTitleBarVisible, setIsTitleBarVisible] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    let heightToShowFrom = 300;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToShowFrom) {
      setIsTitleBarVisible(true);
    } else {
      setIsTitleBarVisible(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    const _res = await getCourseDetails(params.courseSlug);
    if (_res) {
      setCourseDetailsData(_res.data);
    } else {
      navigate("*");
    }
  };

  let sanitizedInstructorDescription;
  let sanitizedCourseDescription;

  if (courseDetailsData) {
    sanitizedInstructorDescription = sanitizedHtmlText(
      courseDetailsData?.instructorDescription
    );
    sanitizedCourseDescription = sanitizedHtmlText(
      courseDetailsData?.description
    );
  }

  return (
    <>
      <NavbarComponent />
      <div className="w-full">
        {isTitleBarVisible && (
          <>
            <div className="hidden lg:block fixed bg-primaryblack h-20 z-50 w-full top-16 py-4 px-10 animate-fadeIn">
              <h1 className="text-white">{courseDetailsData?.title}</h1>
              <div className="flex flex-row space-x-1 justify-start">
                <div className="my-1">
                  {courseDetailsData?.tag === "Bestseller" && (
                    <div>
                      <p className="bg-[#ECEB98] text-primaryblack font-bold text-xs py-0.5 px-1">
                        Bestseller
                      </p>
                    </div>
                  )}
                  {courseDetailsData?.tag === "Coding Exercises" && (
                    <div>
                      <p className="bg-[#CEBFFC] w-full text-primaryblack font-bold text-xs py-0.5 px-1">
                        Coding Exercises
                      </p>
                    </div>
                  )}
                </div>
                <h3 className="text-orange-400 font-bold pt-0.5 text-sm flex items-center justify-center">
                  {courseDetailsData?.rating}
                </h3>
                <div>
                  {courseDetailsData?.rating && (
                    <StarRatings
                      rating={parseFloat(courseDetailsData?.rating)}
                      starRatedColor="orange"
                      numberOfStars={5}
                      starDimension="15px"
                      starSpacing="0px"
                      name="courserating"
                    />
                  )}
                </div>
                <h3 className="text-xs text-purple-300 underline font-light pt-0.5 flex items-center justify-center">
                  1,855 ratings
                </h3>
                <h3 className="text-xs text-white font-light pt-0.5 flex items-center justify-center">
                  ({courseDetailsData?.votes})
                </h3>
              </div>
            </div>
          </>
        )}
        <CoursepreviewComponent
          price={courseDetailsData?.price}
          imageurl={courseDetailsData?.imageurl}
          courseSlug={courseDetailsData?.courseSlug}
          isGiftedCourse={courseDetailsData?.isGiftedCourse}
        />
        <div className="bg-primaryblack w-full text-white">
          {courseDetailsData ? (
            <div className="animate-fadeIn py-10 px-4 lg:px-32 w-full lg:w-8/12">
              <div className="flex flex-row space-x-3 my-3">
                <Link to={`/search?query=${courseDetailsData?.category}`}>
                  <span className="text-findemypurple text-sm lg:text-base flex items-center justify-center hover:opacity-80 cursor-pointer font-light mx-1">
                    {courseDetailsData?.category}{" "}
                  </span>
                </Link>
                <span className="text-white font-light mx-1">{">"}</span>{" "}
                <span className="text-findemypurple text-sm lg:text-base flex items-center justify-center hover:opacity-80 cursor-pointer font-light mx-1">
                  {courseDetailsData?.title}
                </span>
              </div>
              <h1 className="font-bold text-3xl">{courseDetailsData?.title}</h1>
              {sanitizedCourseDescription && (
                <MarkdownView
                  className="text-lg font-normal h-14 card-title"
                  style={{ whiteSpace: "pre-line" }}
                  markdown={sanitizedCourseDescription}
                />
              )}

              <div className="flex flex-row space-x-1 justify-start mt-3">
                <div className="my-1">
                  {courseDetailsData?.tag === "Bestseller" && (
                    <div>
                      <p className="bg-[#ECEB98] text-primaryblack font-bold text-xs py-0.5 px-1">
                        Bestseller
                      </p>
                    </div>
                  )}
                  {courseDetailsData?.tag === "Coding Exercises" && (
                    <div>
                      <p className="bg-[#CEBFFC] w-full text-primaryblack font-bold text-xs py-0.5 px-1">
                        Coding Exercises
                      </p>
                    </div>
                  )}
                </div>
                <h3 className="text-orange-400 font-bold pt-0.5 text-sm flex items-center justify-center">
                  {courseDetailsData?.rating}
                </h3>
                <div>
                  {courseDetailsData?.rating && (
                    <StarRatings
                      rating={parseFloat(courseDetailsData?.rating)}
                      starRatedColor="orange"
                      numberOfStars={5}
                      starDimension="15px"
                      starSpacing="0px"
                      name="courserating"
                    />
                  )}
                </div>
                <h3 className="text-xs text-purple-300 underline font-light pt-0.5 flex items-center justify-center">
                  1,855 ratings
                </h3>
                <h3 className="text-xs text-white font-light pt-0.5 flex items-center justify-center">
                  ({courseDetailsData?.votes})
                </h3>
              </div>

              <div className="font-light text-sm my-2">
                <p>
                  Created by{" "}
                  <span className="text-purple-300 underline">
                    {courseDetailsData?.instructorName}
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
          ) : (
            <div className="flex flex-col items-center justify-center h-36">
              <SpinnerloaderComponent />
            </div>
          )}
        </div>

        <div className="h-full py-10 px-4 lg:pl-32 lg:pr-10 w-full lg:w-8/12">
          <div className="border border-1 p-4">
            <div>
              <h1 className="font-bold text-2xl mb-4">What you'll learn</h1>
            </div>
            {courseDetailsData?.learningOutcomes ? (
              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {courseDetailsData?.learningOutcomes.map((item, i) => {
                  return (
                    <li className="text-gray-500 font-light text-base" key={i}>
                      ✓ {item}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="h-20">
                <SpinnerloaderComponent />
              </div>
            )}
          </div>

          <div className="my-4">
            <div>
              <h1 className="font-bold text-2xl mb-4">Requirements</h1>
            </div>
            {courseDetailsData?.requirements ? (
              <ul>
                {courseDetailsData?.requirements?.map((item, i) => {
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
            ) : (
              <div className="h-20">
                <SpinnerloaderComponent />
              </div>
            )}
          </div>

          <div className="mt-8">
            <div>
              <h1 className="font-bold text-2xl mb-4">Description</h1>
            </div>
            {courseDetailsData?.description ? (
              <p className="text-sm font-light">
                <MarkdownView
                  className="text-sm font-normal"
                  style={{ whiteSpace: "pre-line" }}
                  markdown={sanitizedCourseDescription}
                />
              </p>
            ) : (
              <div className="h-20">
                <SpinnerloaderComponent />
              </div>
            )}
          </div>

          <div className="mt-8">
            <div>
              <h1 className="font-bold text-2xl mb-4">Instructor</h1>
            </div>
            {courseDetailsData?.instructorName ? (
              <>
                <p className="text-lg font-bold text-findemypurple underline">
                  {courseDetailsData?.instructorName}
                </p>
                <p className="text-base font-light text-gray-500">
                  {courseDetailsData?.instructorProfession}
                </p>
                <div className="flex flex-row my-3">
                  <img
                    className="w-32 h-32 rounded-full border"
                    src={courseDetailsData?.instructorImg}
                    alt={courseDetailsData?.instructorName}
                  />
                  <div className="flex flex-col mb-5 mx-4">
                    <div className="flex flex-row space-x-3 my-1">
                      <AiFillStar size={20} />
                      <p className="text-sm font-light">
                        4.7 Instructor Rating
                      </p>
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
                <MarkdownView
                  className="text-sm font-normal"
                  style={{ whiteSpace: "pre-line" }}
                  markdown={sanitizedInstructorDescription}
                />
              </>
            ) : (
              <>
                <div className="h-20">
                  <SpinnerloaderComponent />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default Coursedetailspage;
