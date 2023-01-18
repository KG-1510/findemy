import { FooterComponent, NavbarComponent } from "../shared";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { postSignupUser, successHandler } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { password_regex } from "../../utils/constants";

type SignUpInputs = {
  fullName: string;
  email: string;
  password: string;
};

const Signuppage = (): JSX.Element => {
  const [_, setCookie] = useCookies(["authToken"]);
  const navigate = useNavigate();
  const { setIsUserLoggedIn } = useContext(AuthContext);

  const handleSignup = async (data: SignUpInputs) => {
    const _res = await postSignupUser(data);
    if (_res) {
      setCookie("authToken", _res.token, { path: "/" });
      setIsUserLoggedIn(true);
      successHandler(`Signed up successfully! Welcome ${data.fullName}`);
      navigate("/");

      // setCourseCardsData(_res.data);
      // setCourseDataLoaded(true);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>();
  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    handleSignup(data);
  };
  
  return (
    <>
      <NavbarComponent />
      <div className="w-full mx-auto flex flex-col items-center justify-center py-14">
        <h1 className="pb-8 border-b mb-5 w-full lg:w-2/5 text-center">
          Sign up and start learning!
        </h1>

        <form
          className="w-full flex flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-10/12 lg:w-3/12 relative">
            <AiOutlineUser className="absolute top-5 mx-3" />
            <input
              className="bg-white focus:outline-none border-black border border-1 py-3 pl-10 text-base font-normal w-full my-1"
              type="text"
              placeholder="Full Name"
              {...register("fullName", { required: true })}
            />
            {errors.fullName && (
              <span className="text-red-500 font-light text-sm">
                This field is required!
              </span>
            )}
          </div>

          <div className="w-10/12 lg:w-3/12 relative">
            <AiOutlineMail className="absolute top-5 mx-3" />
            <input
              className="bg-white focus:outline-none border-black border border-1 py-3 pl-10 text-base font-normal w-full my-1"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 font-light text-sm">
                This field is required!
              </span>
            )}
          </div>

          <div className="w-10/12 lg:w-3/12 relative">
            <BiLock className="absolute top-5 mx-3" />
            <input
              className="bg-white focus:outline-none border-black border border-1 py-3 pl-10 text-base font-normal w-full my-1"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 8,
                pattern: password_regex,
              })}
            />
            {errors.password && (
              <span className="text-red-500 font-light text-sm">
                This field is required! Password should contain one uppercase,
                lowercase, digit and alphnumeric character, with minimum 8
                characters
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-findemypurple hover:opacity-90 text-white border border-1 py-3 w-10/12 lg:w-3/12 my-1"
          >
            Sign Up
          </button>
        </form>
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
          <Link to={"/login"}>
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
