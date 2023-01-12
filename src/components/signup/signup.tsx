import { FooterComponent, NavbarComponent } from "../shared";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { Link } from "react-router-dom";

const Signuppage = (): JSX.Element => {
  return (
    <>
      <NavbarComponent />
      <div className="w-full mx-auto flex flex-col items-center justify-center py-14">
        <h1 className="pb-8 border-b mb-5 w-full lg:w-2/5 text-center">
          Sign up and start learning!
        </h1>

        <div className="w-10/12 lg:w-3/12 relative">
          <AiOutlineUser className="absolute top-5 mx-3" />
          <input
            className="bg-white border-black border border-1 py-3 pl-10 text-base font-normal w-full my-1"
            type="text"
            placeholder="Full Name"
          />
        </div>

        <div className="w-10/12 lg:w-3/12 relative">
          <AiOutlineMail className="absolute top-5 mx-3" />
          <input
            className="bg-white border-black border border-1 py-3 pl-10 text-base font-normal w-full my-1"
            type="email"
            placeholder="Email"
          />
        </div>

        <div className="w-10/12 lg:w-3/12 relative">
          <BiLock className="absolute top-5 mx-3" />
          <input
            className="bg-white border-black border border-1 py-3 pl-10 text-base font-normal w-full my-1"
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="bg-findemypurple hover:opacity-90 text-white border border-1 py-3 w-10/12 lg:w-3/12 my-1">
          Sign Up
        </button>
        <p className="text-sm font-normal text-gray-500 pb-4 border-b-2 mt-3 px-6 text-center">
          By signing up, you agree to our{" "}
          <a
            href="https://www.udemy.com/terms/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="underline">Terms of Use</span>
          </a>{" "}
          and{" "}
          <a
            href="https://www.udemy.com/terms/privacy/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="underline">Privacy Policy</span>
          </a>{" "}
        </p>
        <p className="font-normal text-base mt-4">
          Already have an account?{" "}
          <Link to={"/signup"}>
            <span className="text-findemypurple underline font-semibold">
              Log In
            </span>
          </Link>
        </p>
      </div>
      <FooterComponent />
    </>
  );
};

export default Signuppage;
