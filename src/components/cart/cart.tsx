import { FooterComponent, NavbarComponent } from "../shared";
import { CartcardComponent, Cartcardloader } from ".";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserCart } from "../../utils/api";
import { useCookies } from "react-cookie";
import { getDiscountPercent } from "../../utils/functions";
import { CoursedetailsProps, UserDataProps } from "../../utils/interface";
import { useAppSelector } from "../../redux/store/store";

const Cartpage = (): JSX.Element => {
  const [cookie, _] = useCookies(["authToken"]);
  const [cartDataLoaded, setCartDataLoaded] = useState<boolean>(false);
  let oldPriceTotal = 0;
  let newPriceTotal = 0;

  const { cartData } = useAppSelector((store) => store.cart);

  cartData.map((item) => {
    oldPriceTotal = oldPriceTotal + item.oldPrice;
    newPriceTotal = newPriceTotal + item.price;
  });

  useEffect(() => {
    if (cookie?.authToken) {
      const _data: UserDataProps | null = JSON.parse(
        localStorage.getItem("userData")!
      );
      fetchCartItems(cookie?.authToken, _data?._id!);
    }
  }, []);

  useEffect(() => {
    cartData.map((item) => {
      oldPriceTotal = oldPriceTotal + item.oldPrice;
      newPriceTotal = newPriceTotal + item.price;
    });
  }, [cartData]);

  const fetchCartItems = async (authToken: string, userId: string) => {
    const _res = await getUserCart(authToken, userId);
    if (_res) {
      setCartDataLoaded(true);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="py-10 px-4 lg:px-44 font-bold">
        <h1 className="mb-4 text-3xl">Shopping Cart</h1>
        <div className="flex flex-col lg:flex-row">
          <div
            className={`flex flex-col w-full ${
              cartData?.length === 0 ? "lg:w-full" : "lg:w-9/12"
            } `}
          >
            <p className="text-base text-gray-500 font-normal mb-8">
              {cartData?.length} Course
              {cartData?.length > 1 ? "s" : ""} in Cart
            </p>
            {cartData?.length === 0 && cartDataLoaded && (
              <div className="flex flex-col w-full items-center justify-center">
                <h1 className="text-4xl">🫤</h1>
                <p className="text-center">
                  Your cart is empty! Keep shopping to find a course!
                </p>
                <Link to={"/"}>
                  <button className="p-3 bg-findemypurple hover:opacity-90 w-full my-3 text-white font-semibold text-sm">
                    Keep Shopping
                  </button>
                </Link>
              </div>
            )}
            {cartDataLoaded ? (
              <>
                {cartData?.map((data: CoursedetailsProps) => {
                  return (
                    <div key={data?._id} className="px-2 animate-fadeIn">
                      <CartcardComponent
                        _id={data?._id}
                        imageurl={data?.imageurl}
                        title={data?.title}
                        courseSlug={data?.courseSlug}
                        instructorName={data?.instructorName}
                        description={data?.description}
                        rating={data?.rating}
                        votes={data?.votes}
                        price={data?.price}
                        oldPrice={data?.oldPrice}
                        category={data?.category}
                        tag={data?.tag}
                        level={data?.level}
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="hidden lg:flex flex-col space-y-3">
                  <Cartcardloader />
                  <Cartcardloader />
                  <Cartcardloader />
                  <Cartcardloader />
                </div>
                <div className="block lg:hidden space-y-3">
                  <Cartcardloader />
                  <Cartcardloader />
                  <Cartcardloader />
                </div>
              </>
            )}
          </div>
          {cartData?.length === 0 ? (
            <></>
          ) : (
            <div className="flex flex-col w-full lg:w-3/12 p-4">
              <p className="text-gray-500 font-normal text-lg">Total:</p>
              <h1 className="font-bold text-3xl my-2">₹{newPriceTotal}</h1>
              <p className="text-gray-500 font-normal text-sm line-through">
                ₹{oldPriceTotal}
              </p>
              <p className="text-gray-500 font-normal text-sm">
                {getDiscountPercent(oldPriceTotal, newPriceTotal)}% off
              </p>
              <Link to={"/checkout"}>
                <button className="p-3 bg-findemypurple hover:opacity-90 w-full my-3 text-white font-semibold text-sm">
                  Checkout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default Cartpage;
