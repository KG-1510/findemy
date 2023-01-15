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
import { CategorytopicsComponent, Coursecardloader } from ".";

import { useEffect, useState } from "react";
import { getCourses } from "../../utils/api";

const Homepage = (): JSX.Element => {
  const [courseCardsData, setCourseCardsData] = useState<any>();
  const [courseDataLoaded, setCourseDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const _res = await getCourses();
    if (_res) {
      setCourseCardsData(_res.data);
      setCourseDataLoaded(true);
    }
  };

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
                <div key={data._id} className="px-2">
                  <CoursecardComponent
                    id={data._id}
                    imageurl={data.imageurl}
                    title={data.title}
                    courseSlug={data.courseSlug}
                    instructorName={data.instructorName}
                    rating={data.rating}
                    votes={data.votes}
                    price={data.price}
                    oldPrice={data.oldPrice}
                    category={data.category}
                    tag={data.tag}
                    level={data.level}
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
      <CategorytopicsComponent />
      <FooterComponent />
    </>
  );
};

export default Homepage;
