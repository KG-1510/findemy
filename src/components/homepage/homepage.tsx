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
import { CategorytopicsComponent } from ".";

// TODO: To replace with API call
import coursecards from "../../dummy/coursecards.json";

const Homepage = (): JSX.Element => {
  var settings = {
    dots: false,
    infinite: true,
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
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <NavbarComponent />
      <div className="py-10 px-4 lg:px-44 font-bold text-2xl">
        <h1 className="mb-4">Students are viewing</h1>
        <Slider {...settings}>
          {coursecards.map((data) => {
            return (
              <div key={data.id} className="px-2">
                <CoursecardComponent
                  id={data.id}
                  imageurl={data.imageurl}
                  title={data.title}
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
      </div>
      <CategorytopicsComponent />
      <FooterComponent />
    </>
  );
};

export default Homepage;
