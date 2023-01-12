import { Link } from "react-router-dom";
import { FooterComponent, NavbarComponent } from "../shared";
import { AiOutlineMail } from "react-icons/ai";
import { BiLock } from "react-icons/bi";

const Loginpage = (): JSX.Element => {
  return (
    <>
      <NavbarComponent />
      <div className="w-full mx-auto flex flex-col items-center justify-center py-14">
        <h1 className="pb-8 border-b mb-5 w-full lg:w-2/5 text-center">
          Log In to Your Findemy Account!
        </h1>
        <button className="bg-white hover:bg-[#F5F5F5] border border-gray-300 shadow-md py-3 w-10/12 lg:w-3/12 my-1">
          <div className="flex flex-row">
            <img
              className="mx-2"
              width={24}
              src="facebook.svg"
              alt="facebook-icon"
            ></img>
            <p className="px-2">Continue with Facebook</p>
          </div>
        </button>
        <button className="bg-white hover:bg-[#F5F5F5] border border-gray-300 shadow-md py-3 w-10/12 lg:w-3/12 my-1">
          <div className="flex flex-row">
            <img
              className="mx-2"
              width={24}
              src="google.svg"
              alt="facebook-icon"
            ></img>
            <p className="px-2">Continue with Google</p>
          </div>
        </button>
        <button className="bg-white hover:bg-[#F5F5F5] border border-gray-300 shadow-md py-3 w-10/12 lg:w-3/12 my-1">
          <div className="flex flex-row">
            <img
              className="mx-2"
              width={24}
              src="apple.svg"
              alt="facebook-icon"
            ></img>
            <p className="px-2">Continue with Apple</p>
          </div>
        </button>
        <div className="w-10/12 lg:w-3/12 relative">
          <AiOutlineMail className="absolute top-5 mx-3"/>
          <input
            className="bg-white border-black border border-1 py-3 pl-10 text-base font-normal w-full my-1"
            type="email"
            placeholder="Email"
          />
        </div>

        <div className="w-10/12 lg:w-3/12 relative">
          <BiLock className="absolute top-5 mx-3"/>
          <input
            className="bg-white border-black border border-1 py-3 pl-10 text-base font-normal w-full my-1"
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="bg-findemypurple hover:opacity-90 text-white border border-1 py-3 w-10/12 lg:w-3/12 my-1">
          Log In
        </button>
        <p className="font-normal text-base mt-4">
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <span className="text-findemypurple underline font-semibold">Sign Up</span>
          </Link>
        </p>
      </div>
      <FooterComponent />
    </>
  );
};

export default Loginpage;
