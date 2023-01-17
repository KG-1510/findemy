import { FooterComponent, NavbarComponent } from "../shared";
import { CartcardComponent, Cartcardloader } from ".";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserCart } from "../../utils/api";
import { useCookies } from "react-cookie";
import { getDiscountPercent } from "../../utils/functions";

const Cartpage = (): JSX.Element => {
  const [cookie, _] = useCookies(["authToken"]);
  const [cartCardsData, setCartCardsData] = useState<any>([]);
  const [cartDataLoaded, setCartDataLoaded] = useState<boolean>(false);
  const [cartOldPrice, setCartOldPrice] = useState<number>(0);
  const [cartNewPrice, setCartNewPrice] = useState<number>(0);

  useEffect(() => {
    if (cookie?.authToken) {
      const _data = JSON.parse(localStorage.getItem("userData"));
      fetchCartItems(cookie?.authToken, _data?._id);
    }
  }, []);

  const fetchCartItems = async (authToken: string, userId: string) => {
    const _res = await getUserCart(authToken, userId);
    if (_res) {
      setCartCardsData(_res.data.cart);
      setCartOldPrice(_res.data.oldPriceTotal);
      setCartNewPrice(_res.data.newPriceTotal);
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
              cartCardsData?.length === 0 ? "lg:w-full" : "lg:w-9/12"
            } `}
          >
            <p className="text-base text-gray-500 font-normal mb-8">
              {cartCardsData?.length} Courses in Cart
            </p>
            {cartCardsData?.length === 0 && cartDataLoaded && (
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
                {cartCardsData?.map((data) => {
                  return (
                    <div key={data.id} className="px-2">
                      <CartcardComponent
                        id={data?.id}
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
          {cartCardsData?.length === 0 ? (
            <></>
          ) : (
            <div className="flex flex-col w-full lg:w-3/12 p-4">
              <p className="text-gray-500 font-normal text-lg">Total:</p>
              <h1 className="font-bold text-3xl my-2">₹{cartNewPrice}</h1>
              <p className="text-gray-500 font-normal text-sm line-through">
                ₹{cartOldPrice}
              </p>
              {/* TODO: Percentage discount checking utility */}
              <p className="text-gray-500 font-normal text-sm">
                {getDiscountPercent(cartOldPrice, cartNewPrice)}% off
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
