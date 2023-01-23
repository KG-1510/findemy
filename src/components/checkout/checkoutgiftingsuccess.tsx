import Lottie from "react-lottie";
import { FooterComponent, NavbarComponent } from "../shared";
import animationData from "../../utils/checkout-success.json";
import { Link } from "react-router-dom";

const Checkoutgiftingsuccesspage = (): JSX.Element => {
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
      <div className="flex flex-col w-full items-center justify-center p-2 lg:p-10 my-2">
        <Lottie options={defaultOptions} height={200} width={300} />
        <h1 className="text-2xl lg:text-3xl text-center font-bold">
          Woohoo! Your course purchase was successful! 😁
        </h1>
        <p className="text-base text-center font-light my-3">
          Feel proud, you just gifted someone the joy of learning! 🎁
        </p>
        <p className="text-lg text-center font-light my-3">
          📧 An Email for course purchase confirmation has been sent to the
          recipient Email ID!
        </p>
        <Link  to={"/"}>
          <button className="p-3 bg-findemypurple hover:opacity-90 w-full my-3 text-white font-semibold text-sm">
            Keep Shopping
          </button>
        </Link>
      </div>
      <FooterComponent />
    </>
  );
};

export default Checkoutgiftingsuccesspage;
