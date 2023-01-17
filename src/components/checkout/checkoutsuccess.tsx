import Lottie from "react-lottie";
import { FooterComponent, NavbarComponent } from "../shared";
import animationData from "../../utils/checkout-success.json";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getUserProfile } from "../../utils/api";

const Checkoutsuccesspage = (): JSX.Element => {
  const [cookie, _] = useCookies(["authToken"]);
  const [purchasedCardsData, setPurchasedCardsData] = useState<any>([]);
  const [purchasedCardsLoaded, setPurchasedCardsLoaded] =
    useState<boolean>(false);

  const fetchPurchasedItems = async (authToken: string, userId: string) => {
    const _res = await getUserProfile(authToken, userId);
    if (_res) {
      setPurchasedCardsData(_res?.data?.coursesEnrolled);
      setPurchasedCardsLoaded(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cookie?.authToken) {
      const _data = JSON.parse(localStorage.getItem("userData"));
      fetchPurchasedItems(cookie?.authToken, _data?._id);
    }
  }, []);

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
        <p className="text-base font-light my-3">
          Embark on your journey of learning!
        </p>
        <p>Here's what you purchased so far!</p>
        <div className="flex flex-col w-full lg:w-2/4">
          {purchasedCardsLoaded ? (
            <>
              {purchasedCardsData?.map((item) => {
                return (
                  <>
                    <Link to={`/coursedetails/${item?.courseSlug}`}>
                      <div className="border flex flex-row w-full p-2 my-1">
                        <img
                          className="w-3/12"
                          src={item?.imageurl}
                          alt={item?.title}
                        />
                        <h1 className="p-2 hover:text-findemypurple w-full">
                          {item?.title}
                        </h1>
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-findemypurple">₹{item?.price}</p>
                          <p className="line-through text-sm font-light">
                            ₹{item?.oldPrice}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
            </>
          ) : (
            <>
              {/* TODO: Skeleton loader */}
              <p>Please wait...</p>
            </>
          )}
        </div>
        <Link to={"/"}>
          <button className="p-3 bg-findemypurple hover:opacity-90 w-full my-3 text-white font-semibold text-sm">
            Keep Shopping
          </button>
        </Link>
      </div>
      <FooterComponent />
    </>
  );
};

export default Checkoutsuccesspage;
