import { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import {
  FooterComponent,
  NavbarComponent,
  SpinnerloaderComponent,
} from "../shared";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { postLoginUser, successHandler } from "../../utils/api";
import { AuthContext } from "../../App";
import { toast } from "react-toastify";

type LogInInputs = {
  email: string;
  password: string;
};

const Loginpage = (): JSX.Element => {
  const [cookie, setCookie] = useCookies(["authToken"]);
  const [isSubmittingLogin, setIsSubmittingLogin] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setIsUserLoggedIn } = useContext(AuthContext);

  const clientId: string | undefined = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleGoogleCallbackResponse = (response: any) => {
    const userObject: any = jwt_decode(response.credential);
    const payload = {
      email: userObject?.email,
      password: `${userObject.given_name}@123`,
    };
    handleLogin(payload);
  };

  useEffect(() => {
    if (cookie?.authToken) {
      {
        toast.error("You are already logged in! No need to login again!", {
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
      { theme: "outline", size: "large", text: "continue_with", width: "356" }
    );
  }, []);

  const handleLogin = async (data: LogInInputs) => {
    const _res = await postLoginUser(data);
    if (_res) {
      setCookie("authToken", _res.token, { path: "/" });
      setIsUserLoggedIn(true);
      const payload = {
        _id: _res.data._id,
        fullName: _res.data.fullName,
        imageurl: _res.data.imageurl,
        email: _res.data.email,
      };
      localStorage.setItem("userData", JSON.stringify(payload));
      successHandler(`You're logged in! Welcome ${_res.data.fullName}`);
      setIsSubmittingLogin(false);
      navigate("/");
    }
    setIsSubmittingLogin(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInInputs>();
  const onSubmit: SubmitHandler<LogInInputs> = (data) => {
    setIsSubmittingLogin(true);
    handleLogin(data);
  };
  return (
    <>
      <NavbarComponent />
      <div className="w-full mx-auto flex flex-col items-center justify-center py-14">
        <h1 className="pb-8 border-b mb-5 w-full lg:w-2/5 text-center">
          Log In to Your Findemy Account!
        </h1>
        <button className="bg-white hover:bg-[#F5F5F5] border border-gray-300 shadow-md py-2 w-10/12 lg:w-3/12 my-1">
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
        <button className="bg-white hover:bg-[#F5F5F5] border border-gray-300 shadow-md py-2 w-10/12 lg:w-3/12 my-1">
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
        <div id="googleSignInDiv"></div>
        <p className="my-2">or</p>
        <form
          className="w-full flex flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
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
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 font-light text-sm">
                This field is required!
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
            disabled={isSubmittingLogin}
            type="submit"
            className={`${
              isSubmittingLogin ? "opacity-25 cursor-wait" : "hover:opacity-90"
            } bg-findemypurple text-white border border-1 py-3 w-10/12 lg:w-3/12 my-1`}
          >
            {isSubmittingLogin ? <SpinnerloaderComponent /> : "Log In"}
          </button>
        </form>
        <p className="font-normal text-base mt-4">
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <span className="text-findemypurple underline font-semibold">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
      <FooterComponent />
    </>
  );
};

export default Loginpage;
