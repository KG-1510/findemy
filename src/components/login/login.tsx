import { useContext } from "react";
import { Link } from "react-router-dom";
import { FooterComponent, NavbarComponent } from "../shared";
import { AiOutlineMail } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { postLoginUser, successHandler } from "../../utils/api";
import { AuthContext } from "../../App";
import { GoogleLogin } from "react-google-login";

type LogInInputs = {
  email: string;
  password: string;
};

const Loginpage = (): JSX.Element => {
  const [_, setCookie] = useCookies(["authToken"]);
  const navigate = useNavigate();
  const { setIsUserLoggedIn } = useContext(AuthContext);

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

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
      navigate("/");
    }
  };

  const onGoogleLoginSuccess = (res) => {
    console.log("User logged in with Google", res.profileObj);
  };

  const onGoogleLoginFailure = (res) => {
    console.log("FAILURE: User logged in with Google", res);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInInputs>();
  const onSubmit: SubmitHandler<LogInInputs> = (data) => {
    handleLogin(data);
  };
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
        {/* <GoogleLogin
          clientId={clientId}
          buttonText={"Continue with Google"}
          onSuccess={onGoogleLoginSuccess}
          onFailure={onGoogleLoginFailure}
          isSignedIn={true}
        /> */}
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
        <form
          className="w-full flex flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
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
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 font-light text-sm">
                This field is required!
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-findemypurple hover:opacity-90 text-white border border-1 py-3 w-10/12 lg:w-3/12 my-1"
          >
            Log In
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
