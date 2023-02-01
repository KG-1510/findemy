import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FooterComponent, NavbarComponent } from "../shared";
const Teachpage = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col-reverse lg:flex-row justify-between relative">
        <div className="flex flex-col items-center justify-center lg:absolute top-32 left-20 w-full lg:w-4/12">
          <h1 className="text-center text-3xl lg:text-6xl mt-5 lg:mt-0">
            Come teach with us
          </h1>
          <p className="text-base font-light mt-4">
            Become an intructor and change
          </p>
          <p className="text-base font-light mt-1">
            lives - including your own
          </p>
          <Link
            className="w-full flex items-center justify-center"
            to="/teach/uploadcourse"
          >
            <button className="p-3 bg-primaryblack hover:opacity-90 w-10/12 lg:w-4/5 my-3 mx-auto text-white font-semibold text-sm">
              Get Started
            </button>
          </Link>
        </div>
        <img
          src="https://s.udemycdn.com/teaching/billboard-desktop-2x-v4.jpg"
          alt="teach-on-findemy"
        />
      </div>
      <div className="flex flex-col items-center justify-center my-14 lg:my-20">
        <h1 className="text-center text-3xl lg:text-4xl mt-5 lg:mt-0">
          So many reasons to start
        </h1>
        <div className="flex flex-col lg:flex-row w-full justify-evenly my-10">
          <div className="flex flex-col items-center justify-center w-full my-4 lg:my-0 lg:w-1/4">
            <img
              src="https://s.udemycdn.com/teaching/value-prop-teach-2x-v3.jpg"
              alt="teach-your-way"
              className="w-32"
            />
            <h2 className="text-xl">Teach your way</h2>
            <p className="text-sm font-light text-center px-5 lg:px-0">
              Publish the course you want, in the way you want, and always have
              control of your own content.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-4 lg:my-0 lg:w-1/4">
            <img
              src="https://s.udemycdn.com/teaching/value-prop-inspire-2x-v3.jpg"
              alt="inspire-learners"
              className="w-32"
            />
            <h2 className="text-xl">Inspire learners</h2>
            <p className="text-sm font-light text-center px-5 lg:px-0">
              Teach what you know and help learners explore their interests,
              gain new skills, and advance their careers.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-full my-4 lg:my-0 lg:w-1/4">
            <img
              src="https://s.udemycdn.com/teaching/value-prop-get-rewarded-2x-v3.jpg"
              alt="get-rewarded"
              className="w-32"
            />
            <h2 className="text-xl">Get rewarded</h2>
            <p className="text-sm font-light text-center px-5 lg:px-0">
              Expand your professional network, build your expertise, and earn
              money on each paid enrollment.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly p-12 lg:p-20 bg-findemypurple">
        <div className="flex flex-col items-center justify-center my-3 lg:my-0">
          <p className="text-4xl font-bold text-white">57M</p>
          <p className="text-base font-light text-white">Students</p>
        </div>
        <div className="flex flex-col items-center justify-center my-3 lg:my-0">
          <p className="text-4xl font-bold text-white">75+</p>
          <p className="text-base font-light text-white">Languages</p>
        </div>
        <div className="flex flex-col items-center justify-center my-3 lg:my-0">
          <p className="text-4xl font-bold text-white">773M</p>
          <p className="text-base font-light text-white">Enrollments</p>
        </div>
        <div className="flex flex-col items-center justify-center my-3 lg:my-0">
          <p className="text-4xl font-bold text-white">180+</p>
          <p className="text-base font-light text-white">Countries</p>
        </div>
        <div className="flex flex-col items-center justify-center my-3 lg:my-0">
          <p className="text-4xl font-bold text-white">13,400+</p>
          <p className="text-base font-light text-white">
            Enterprise Customers
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-100 py-32">
        <div className="flex flex-col text-center items-center justify-center w-full lg:w-2/4">
          <h1 className="text-5xl px-2 lg:px-0">Become an instructor today</h1>
          <p className="text-lg my-4 font-light text-center">
            Join one of the world's largest online learning marketplace.
          </p>
          <Link
            className="w-full flex items-center justify-center"
            to="/teach/uploadcourse"
          >
            <button className="p-3 bg-primaryblack hover:opacity-90 w-10/12 lg:w-3/5 my-3 mx-auto text-white font-semibold text-sm">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default Teachpage;
