import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  NavbarComponent,
  CoursecardComponent,
  NextArrow,
  PrevArrow,
  FooterComponent,
} from "../shared";
import { AuthContext } from "../../App";
import { CategorytopicsComponent, Coursecardloader } from ".";

import { useContext, useEffect, useState } from "react";
import { getCourses, getUserProfile } from "../../utils/api";
import { useCookies } from "react-cookie";

const Homepage = (): JSX.Element => {
  const [cookie, _] = useCookies(["authToken"]);
  const [courseCardsData, setCourseCardsData] = useState<any>();
  const [courseDataLoaded, setCourseDataLoaded] = useState<boolean>(false);
  const [purchasedCardsData, setPurchasedCardsData] = useState<any>([]);
  const [purchasedCardsLoaded, setPurchasedCardsLoaded] =
    useState<boolean>(false);
  const [userData, setUserData] = useState<any>({});

  const { isUserLoggedIn } = useContext(AuthContext);

  const fetchPurchasedItems = async (authToken: string, userId: string) => {
    const _res = await getUserProfile(authToken, userId);
    if (_res) {
      setPurchasedCardsData(_res?.data?.coursesEnrolled);
      setPurchasedCardsLoaded(true);
    }
  };

  const fetchCourses = async () => {
    const _res = await getCourses();
    if (_res) {
      setCourseCardsData(_res.data);
      setCourseDataLoaded(true);
    }
  };

  useEffect(() => {
    fetchCourses();
    if (cookie?.authToken) {
      const _data = JSON.parse(localStorage.getItem("userData"));
      setUserData(_data);
      fetchPurchasedItems(cookie?.authToken, _data?._id);
    }
  }, []);

  var settings = {
    dots: false,
    infinite: false,
    slidesToScroll: 1,
    slidesToShow: 4,
    arrows: true,
    autoplay: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <>
      <NavbarComponent />
      <div className="py-10 px-4 lg:px-44 font-bold text-2xl">
        <h1 className="mb-4">Students are viewing</h1>
        {courseDataLoaded ? (
          <Slider {...settings}>
            {courseCardsData?.map((data) => {
              return (
                <div key={data?._id} className="px-2 animate-fadeIn hover:drop-shadow-sm">
                  <CoursecardComponent
                    key={data?._id}
                    id={data?._id}
                    imageurl={data?.imageurl}
                    title={data?.title}
                    courseSlug={data?.courseSlug}
                    instructorName={data?.instructorName}
                    rating={data?.rating}
                    votes={data?.votes}
                    price={data?.price}
                    oldPrice={data?.oldPrice}
                    category={data?.category}
                    tag={data?.tag}
                    level={data?.level}
                  />
                </div>
              );
            })}
          </Slider>
        ) : (
          <>
            <div className="hidden lg:flex flex-row space-x-3">
              <Coursecardloader />
              <Coursecardloader />
              <Coursecardloader />
              <Coursecardloader />
            </div>
            <div className="block lg:hidden">
              <Coursecardloader />
            </div>
          </>
        )}
      </div>

      {isUserLoggedIn && (
        <>
          <div className="py-10 px-4 lg:px-44 font-bold text-2xl">
            <h1 className="mb-4">
              Let's start learning, {userData?.fullName}!
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {purchasedCardsLoaded ? (
                <>
                  {purchasedCardsData?.map((data) => {
                    return (
                      <>
                        <div key={data?._id} className="px-2 animate-fadeIn">
                          <CoursecardComponent
                            key={data?._id}
                            id={data?._id}
                            imageurl={data?.imageurl}
                            title={data?.title}
                            courseSlug={data?.courseSlug}
                            instructorName={data?.instructorName}
                            rating={data?.rating}
                            votes={data?.votes}
                            category={data?.category}
                            tag={data?.tag}
                            level={data?.level}
                          />
                        </div>
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  <div className="hidden lg:flex flex-row space-x-3">
                    <Coursecardloader />
                    <Coursecardloader />
                    <Coursecardloader />
                    <Coursecardloader />
                  </div>
                  <div className="flex flex-col items-center justify-center mx-auto lg:hidden">
                    <Coursecardloader />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
      <CategorytopicsComponent />
      <FooterComponent />
    </>
  );
};

export default Homepage;
