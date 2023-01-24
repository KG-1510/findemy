import jwt_decode from "jwt-decode";
import {
  FooterComponent,
  NavbarComponent,
  SpinnerloaderComponent,
} from "../shared";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { postSignupUser, successHandler } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import { password_regex } from "../../utils/constants";
import { toast } from "react-toastify";

type SignUpInputs = {
  fullName: string;
  email: string;
  password: string;
  imageurl?: string;
};

const Signuppage = (): JSX.Element => {
  const [cookie, setCookie] = useCookies(["authToken"]);
  const [isSubmittingSignup, setIsSubmittingSignup] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setIsUserLoggedIn } = useContext(AuthContext);

  const clientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleGoogleCallbackResponse = (response) => {
    const userObject: any = jwt_decode(response.credential);
    const payload = {
      fullName: userObject?.name,
      email: userObject?.email,
      password: `${userObject.given_name}@123`,
      imageurl: userObject?.picture,
    };
    handleSignup(payload);
  };

  useEffect(() => {
    if (cookie?.authToken) {
      {
        toast.error("You are already logged in! No need to signup again!", {
          toastId: "unauthorized",
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          className: "font-DMSans",
        });
      }
      navigate("/");
    }
    /* global google */
    // @ts-expect-error
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleCallbackResponse,
    });

    // @ts-expect-error
    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large", text: "continue_with", width: "346" }
    );
  }, []);

  const handleSignup = async (data: SignUpInputs) => {
    const _res = await postSignupUser(data);
    if (_res) {
      setCookie("authToken", _res.token, { path: "/" });
      const payload = {
        _id: _res?.data?._id,
        fullName: _res?.data?.fullName,
        imageurl: _res?.data?.imageurl,
        email: _res?.data?.email,
      };
      localStorage.setItem("userData", JSON.stringify(payload));
      setIsUserLoggedIn(true);
      successHandler(`Signed up successfully! Welcome ${data.fullName}`);
      setIsSubmittingSignup(false);
      navigate("/");
    }
    setIsSubmittingSignup(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>();
  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    setIsSubmittingSignup(true);
    handleSignup(data);
  };

  return (
    <>
      <NavbarComponent />
      <div className="w-full mx-auto flex flex-col items-center justify-center py-14">
        <h1 className="pb-8 border-b mb-5 w-full lg:w-2/5 text-center">
          Sign up and start learning!
        </h1>

        <div id="googleSignInDiv"></div>
        <p className="my-2">or</p>

        <form
          className="w-full flex flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-10/12 lg:w-3/12 relative">
            <AiOutlineUser className="absolute top-5 mx-3" />
            <input
              aria-label="Full Name"
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
              aria-label="Email"
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
              aria-label="Password"
              className="bg-white focus:outline-none border-black border border-1 py-3 pl-10 text-base font-normal w-full my-1"
              type={showPassword ? "text" : "password"}
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
            {!showPassword ? (
              <span
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(true);
                }}
              >
                <AiOutlineEye className="absolute top-5 right-4" size={20} />
              </span>
            ) : (
              <span
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(false);
                }}
              >
                <AiOutlineEyeInvisible
                  className="absolute top-5 right-4"
                  size={20}
                />
              </span>
            )}
          </div>
          <button
            disabled={isSubmittingSignup}
            type="submit"
            className={`${
              isSubmittingSignup ? "opacity-25 cursor-wait" : "hover:opacity-90"
            } bg-findemypurple text-white border border-1 py-3 w-10/12 lg:w-3/12 my-1`}
          >
            {isSubmittingSignup ? <SpinnerloaderComponent /> : "Sign Up"}
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
