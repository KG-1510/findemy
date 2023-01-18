import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import { FooterComponent, NavbarComponent } from ".";
import animationData from "../../utils/404-findemy.json";

const NotfoundComponent = (): JSX.Element => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <NavbarComponent />
      <div className="w-full flex flex-col items-center justify-center my-10 p-14">
        <Lottie options={defaultOptions} height={200} width={310} />
        <p className="my-2 text-center">
          Looks like you are lost, the requested page could not be found!
        </p>
        <Link to={"/"}>
          <button className="p-3 bg-findemypurple hover:opacity-90 w-full my-3 text-white font-semibold text-sm">
            Take me home
          </button>
        </Link>
      </div>
      <FooterComponent />
    </>
  );
};

export default NotfoundComponent;
