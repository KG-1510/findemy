import { useForm, SubmitHandler } from "react-hook-form";
import { FooterComponent, NavbarComponent } from "../shared";
import { AiFillLock } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  errorHandler,
  getUserCart,
  postCourseEnroll,
  postGiftedCourseEnroll,
  postGiftSuccessMail,
  postPurchaseSuccessMail,
  postRazorpayOrderId,
  successHandler,
} from "../../utils/api";
import axios from "axios";
import {
  baseUrl,
  expiration_date_regex,
  indian_states_ut,
  upi_vpa_regex,
} from "../../utils/constants";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Checkoutordersloader } from ".";

type CardPaymentInputs = {
  nameOnCard: string;
  cardNumber: string;
  cvv: number;
  expirationDate: string;
};

const Checkoutpage = (): JSX.Element => {
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<string>("");
  const [cookie, _] = useCookies(["authToken"]);
  const [cartCardsData, setCartCardsData] = useState<any>([]);
  const [cartDataLoaded, setCartDataLoaded] = useState<boolean>(false);
  const [cartOldPrice, setCartOldPrice] = useState<number>(0);
  const [cartNewPrice, setCartNewPrice] = useState<number>(0);
  const [userEmail, setUserEmail] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cookie?.authToken) {
      const _data = JSON.parse(localStorage.getItem("userData"));
      fetchCartItems(cookie?.authToken, _data?._id);
      setUserEmail(_data?.email);
    }
  }, []);

  const fetchCartItems = async (authToken: string, userId: string) => {
    const _res = await getUserCart(authToken, userId);
    if (_res?.data?.cart.length !== 0) {
      setCartCardsData(_res?.data?.cart);
      setCartOldPrice(_res?.data?.oldPriceTotal);
      setCartNewPrice(_res?.data?.newPriceTotal);
      setCartDataLoaded(true);
    } else {
      navigate("/");
      {
        toast.error(
          "Your cart is empty, add items to cart before purchasing!",
          {
            toastId: "cart-empty",
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            className: "font-DMSans",
          }
        );
      }
    }
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const handlePaymentMode = (e: any) => {
    setSelectedPaymentMode(e.target.value);
  };

  const handleCheckout = async () => {
    try {
      if (cookie?.authToken && selectedPaymentMode) {
        let paymentMethod;
        paymentMethod =
          selectedPaymentMode === "paytm" || selectedPaymentMode === "wallet"
            ? "upi"
            : selectedPaymentMode;

        const _res = await postRazorpayOrderId(
          cookie?.authToken,
          cartNewPrice,
          paymentMethod
        );
        if (_res) {
          initPayment(_res?.data);
        }
      } else {
        toast.error("Please select a payment method before proceeding!", {
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
    } catch (err) {
      errorHandler("Something went wrong, please try again later!");
    }
  };

  const initPayment = async (data) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Error loading Razorpay SDK! Please try again later!");
      return;
    }
    const KEY_ID: string = process.env.REACT_APP_RAZORPAY_KEY_ID;
    const options = {
      key: KEY_ID,
      amount: cartNewPrice,
      currency: "INR",
      name: "Findemy",
      description: "Purchase courses transaction",
      prefill: {
        email: userEmail,
      },
      image:
        "https://user-images.githubusercontent.com/60519359/212956791-233d6fe1-933e-4b6e-ba1c-318a9a6853a6.png",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = `${baseUrl}/payment/verify`;
          const _res = await axios({
            method: "POST",
            url: verifyUrl,
            headers: {
              Authorization: `Bearer ${cookie?.authToken}`,
            },
            data: response,
          });
          if (_res?.data?.success) {
            const _data = JSON.parse(localStorage.getItem("userData"));
            const _giftCoursedata = JSON.parse(
              localStorage.getItem("giftCourseData")
            );
            console.log(_giftCoursedata);
            if (_giftCoursedata) {
              const _resGift = await postGiftedCourseEnroll(
                cookie?.authToken,
                _data?._id,
                cartCardsData,
                _giftCoursedata?.recipientEmail
              );
              successHandler(_resGift?.data?.message);
              await postGiftSuccessMail(
                cookie?.authToken,
                _data?.fullName,
                _data?.email,
                _giftCoursedata?.recipientName,
                _giftCoursedata?.recipientEmail,
                cartCardsData,
                _giftCoursedata?.message
              );
              localStorage.removeItem("giftCourseData");
              navigate("/giftingcheckoutsuccess");
            } else {
              const res = await postCourseEnroll(
                cookie?.authToken,
                _data?._id,
                cartCardsData
              );
              if (res) {
                console.log(res);
                successHandler(_res?.data?.message);
                await postPurchaseSuccessMail(
                  cookie?.authToken,
                  _data?.fullName,
                  _data?.email,
                  cartCardsData
                );
                navigate("/checkoutsuccess");
              }
            }
          }
        } catch (error) {
          {
            toast.error("Payment failed, please retry after sometime!", {
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
          console.log(error);
          navigate("/cart");
        }
      },
      theme: {
        color: "#A435EF",
      },
    };

    const rzpObject = (window as any).Razorpay(options);
    rzpObject.open();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardPaymentInputs | any>();
  const onSubmit: SubmitHandler<CardPaymentInputs | any> = (data) => {
    console.log("Form data:", data);
    if (data) {
      handleCheckout();
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="p-4 lg:p-12 mx-auto">
        <div className="flex flex-col items-center justify-center w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col w-full lg:w-5/12">
            <h2 className="mb-4 font-bold text-4xl text-heading">Checkout</h2>
            <h3 className="mb-4 font-bold text-xl text-heading">
              Billing Address
            </h3>

            <div className="space-x-0 lg:flex lg:space-x-4">
              <div className="w-full lg:w-1/2">
                <label
                  htmlFor="country"
                  className="flex flex-row justify-between mb-3 text-sm font-semibold text-primaryblack"
                >
                  <span>Country</span>
                  <span className="text-gray-500 font-light text-xs">
                    Required
                  </span>
                </label>
                <input
                  aria-label="country"
                  name="country"
                  type="text"
                  placeholder="Country"
                  value={"India"}
                  disabled={true}
                  className="w-full px-4 py-2 opacity-60 cursor-not-allowed border border-black"
                />
              </div>
              <div className="w-full lg:w-1/2">
                <label
                  htmlFor="state"
                  className="flex flex-row justify-between mb-3 text-sm font-semibold text-primaryblack"
                >
                  <span>State / Union Territory</span>
                  <span className="text-gray-500 font-light text-xs">
                    Required
                  </span>
                </label>

                <select
                  className="w-full px-4 py-2 border border-black focus:outline-none"
                  name="state"
                >
                  <option selected={true}>Please select...</option>
                  {indian_states_ut.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                </select>
              </div>
            </div>
            <p className="text-xs font-light mt-1 mb-4 text-gray-500">
              Findemy is required by law to collect applicable transaction taxes
              for purchases made in certain tax jurisdictions.
            </p>

            <div className="flex flex-row justify-between">
              <h3 className="mb-4 font-bold text-xl text-heading">
                Payment Method
              </h3>
              <div className="flex flex-row items-center">
                <span className="text-xs font-light text-gray-500 px-2">
                  Secured connection
                </span>
                <AiFillLock />
              </div>
            </div>

            <div className="w-full mx-auto">
              <div className="shadow-md">
                <div className="w-full overflow-hidden border-t relative">
                  <div onChange={(e) => handlePaymentMode(e)}>
                    <input
                      className="absolute top-6 left-1"
                      id="tab-single-one"
                      type="radio"
                      value={"card"}
                      name="payment-mode"
                    />
                    <label
                      className="block p-5 leading-normal cursor-pointer bg-gray-100"
                      htmlFor="tab-single-one"
                    >
                      <div className="flex flex-row justify-between">
                        <span className="flex flex-row items-center justify-center">
                          <img
                            width={35}
                            className="bg-white rounded-sm border border-primaryblack mr-1"
                            src="card-icon.svg"
                            alt="card-icon"
                          />
                          Credit / Debit Card
                        </span>
                        <img
                          width={170}
                          src="cardsAccepted.png"
                          alt="cards-accepted"
                          className="hidden lg:block rounded-sm border border-black"
                        />
                      </div>
                    </label>
                  </div>
                  {selectedPaymentMode === "card" && (
                    <form
                      className="w-full flex flex-col items-center justify-center"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="overflow-hidden bg-white leading-normal p-4 w-full">
                        <div className="w-full">
                          <label
                            htmlFor="nameOnCard"
                            className="flex flex-row justify-between mb-1 mt-2 text-sm font-semibold text-primaryblack"
                          >
                            <span>Name on card</span>
                          </label>
                          <input
                            name="nameOnCard"
                            type="text"
                            placeholder="Name on card"
                            className="w-full text-base font-normal px-4 py-2 focus:outline-none border border-black"
                            {...register("nameOnCard", { required: true })}
                          />
                          {errors.nameOnCard && (
                            <span className="text-red-500 font-light text-xs">
                              This field is required!
                            </span>
                          )}
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="cardNumber"
                            className="flex flex-row justify-between mb-1 mt-2 text-sm font-semibold text-primaryblack"
                          >
                            <span>Card number</span>
                          </label>
                          <input
                            name="cardNumber"
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            onKeyUp={(e: any) => {
                              let cardnumspaced = e.target.value
                                .replace(/\W/gi, "")
                                .replace(/(.{4})/g, "$1 ");
                              e.target.value = cardnumspaced;
                              console.log(e.target.value);
                            }}
                            className="w-full text-base font-normal tracking-wider px-4 py-2 focus:outline-none border border-black"
                            {...register("cardNumber", {
                              required: true,
                              maxLength: 23,
                            })}
                          />
                          {errors.cardNumber && (
                            <span className="text-red-500 font-light text-xs">
                              This field is required!
                            </span>
                          )}
                        </div>

                        <div className="w-full flex flex-row space-x-3">
                          <div className="w-full">
                            <label
                              htmlFor="cvv"
                              className="flex flex-row justify-between mb-1 mt-2 text-sm font-semibold text-primaryblack"
                            >
                              <span>CVV / CVC</span>
                            </label>
                            <input
                              name="cvv"
                              type="password"
                              placeholder="CVV / CVC"
                              className="w-full text-base font-normal px-4 py-2 focus:outline-none border border-black"
                              {...register("cvv", {
                                required: true,
                                minLength: 3,
                                maxLength: 3,
                              })}
                            />
                            {errors.cvv && (
                              <span className="text-red-500 font-light text-xs">
                                This field is required!
                              </span>
                            )}
                          </div>

                          <div className="w-full">
                            <label
                              htmlFor="expirationDate"
                              className="flex flex-row justify-between mb-1 mt-2 text-sm font-semibold text-primaryblack"
                            >
                              <span>Expiration Date</span>
                            </label>
                            <input
                              name="expirationDate"
                              type="text"
                              placeholder="MM/YY"
                              className="w-full text-base font-normal px-4 py-2 focus:outline-none border border-black"
                              {...register("expirationDate", {
                                required: true,
                                pattern: expiration_date_regex,
                              })}
                            />
                            {errors.expirationDate && (
                              <span className="text-red-500 font-light text-xs">
                                This field is required!
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full justify-end">
                        <button
                          type="submit"
                          className="p-3 bg-findemypurple hover:opacity-90 w-8/12 mx-auto my-3 text-white font-semibold text-sm"
                        >
                          Make Payment
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                <div className="tab w-full overflow-hidden border-t relative">
                  <div onChange={(e) => handlePaymentMode(e)}>
                    <input
                      className="absolute top-6 left-1"
                      id="tab-single-two"
                      type="radio"
                      value={"upi"}
                      name="payment-mode"
                    />
                    <label
                      className="block p-5 leading-normal cursor-pointer bg-gray-100"
                      htmlFor="tab-single-two"
                    >
                      <span className="flex flex-row items-center">
                        {" "}
                        <img
                          width={35}
                          className="bg-white rounded-sm border border-primaryblack mr-1"
                          src="upi-icon.svg"
                          alt="upi-icon"
                        />
                        UPI
                      </span>
                    </label>
                  </div>
                  {selectedPaymentMode === "upi" && (
                    <div className="overflow-hidden bg-white leading-normal p-4">
                      <div className="w-full">
                        <p className="font-normal text-base">
                          Enter your UPI ID / VPA and make payment on your UPI
                          app.
                        </p>
                        <form
                          className="w-full flex flex-col items-center justify-center"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <label
                            htmlFor="upiID"
                            className="flex flex-row justify-between mb-1 mt-2 text-sm font-semibold text-primaryblack"
                          >
                            UPI ID / VPA
                          </label>

                          <input
                            name="upiID"
                            type="text"
                            placeholder="johndoe@okbank or 9876543210@okbank"
                            className="w-full text-base font-normal px-4 py-2 focus:outline-none border border-black"
                            {...register("upiID", {
                              required: true,
                            })}
                          />
                          {errors.upiID && (
                            <span className="text-red-500 font-light text-xs">
                              This field is required!
                            </span>
                          )}
                          <div className="flex w-full justify-end">
                            <button
                              type="submit"
                              className="p-3 bg-findemypurple hover:opacity-90 w-8/12 mx-auto my-3 text-white font-semibold text-sm"
                            >
                              Make Payment
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
                <div className="tab w-full overflow-hidden border-t relative">
                  <div onChange={(e) => handlePaymentMode(e)}>
                    <input
                      className="absolute top-6 left-1"
                      id="tab-single-three"
                      type="radio"
                      value={"paytm"}
                      name="payment-mode"
                    />
                    <label
                      className="block p-5 leading-normal cursor-pointer bg-gray-100"
                      htmlFor="tab-single-three"
                    >
                      <span className="flex flex-row items-center">
                        {" "}
                        <img
                          className="bg-white rounded-sm border border-primaryblack mr-1"
                          width={35}
                          src="paytm-icon.svg"
                          alt="paytm-icon"
                        />
                        PayTM
                      </span>
                    </label>
                  </div>
                  {selectedPaymentMode === "paytm" && (
                    <div className="overflow-hidden bg-white leading-normal">
                      <p className="font-normal text-base p-4">
                        Your payment will be fulfilled by Razorpay Payment
                        gateway.
                      </p>
                    </div>
                  )}
                </div>
                <div className="tab w-full overflow-hidden border-t relative">
                  <div onChange={(e) => handlePaymentMode(e)}>
                    <input
                      className="absolute top-6 left-1"
                      id="tab-single-four"
                      type="radio"
                      value={"netbanking"}
                      name="payment-mode"
                    />
                    <label
                      className="block p-5 leading-normal cursor-pointer bg-gray-100"
                      htmlFor="tab-single-four"
                    >
                      <span className="flex flex-row items-center">
                        {" "}
                        <img
                          className="bg-white rounded-sm border border-primaryblack mr-1"
                          width={35}
                          src="netbanking.svg"
                          alt="netbanking-icon"
                        />
                        Net Banking
                      </span>
                    </label>
                  </div>
                  {selectedPaymentMode === "netbanking" && (
                    <div className="overflow-hidden bg-white leading-normal">
                      <p className="font-normal text-base p-4">
                        Your payment will be fulfilled by Razorpay Payment
                        gateway.
                      </p>
                    </div>
                  )}
                </div>
                <div className="tab w-full overflow-hidden border-t relative">
                  <div onChange={(e) => handlePaymentMode(e)}>
                    <input
                      className="absolute top-6 left-1"
                      id="tab-single-five"
                      type="radio"
                      value={"wallet"}
                      name="payment-mode"
                    />
                    <label
                      className="block p-5 leading-normal cursor-pointer bg-gray-100"
                      htmlFor="tab-single-five"
                    >
                      <span className="flex flex-row items-center">
                        {" "}
                        <img
                          className="bg-white rounded-sm border border-primaryblack mr-1"
                          width={35}
                          src="wallet-icon.svg"
                          alt="wallet-icon"
                        />
                        Mobile Wallets
                      </span>
                    </label>
                  </div>
                  {selectedPaymentMode === "wallet" && (
                    <div className="overflow-hidden bg-white leading-normal">
                      <p className="font-normal text-base p-4">
                        Your payment will be fulfilled by Razorpay Payment
                        gateway.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <h3 className="mb-4 mt-8 font-bold text-xl text-heading">Order</h3>
            {cartDataLoaded ? (
              <>
                {cartCardsData?.map((item) => {
                  return (
                    <>
                      <Link to={`/coursedetails/${item?.courseSlug}`}>
                        <div className="border flex flex-row p-2 my-1">
                          <img
                            className="w-5/12 lg:w-3/12"
                            src={item?.imageurl}
                            alt={item?.title}
                          />
                          <div className="flex flex-col">
                            <h1 className="p-2 text-sm lg:text-base hover:text-findemypurple">
                              {item?.title}
                            </h1>
                            {item?.isGiftedCourse && (
                              <p className="text-xs font-light px-2">
                                🎁 You are gifting this course!
                              </p>
                            )}
                          </div>
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
                <div className="flex flex-col space-y-3 my-2">
                  <Checkoutordersloader />
                  <Checkoutordersloader />
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-4/12 bg-blue-50 h-auto lg:h-screen p-4">
            <h3 className="mb-4 font-bold text-xl text-heading">Summary</h3>
            <div className="flex flex-row w-full justify-between my-1">
              <p className="text-primaryblack font-light text-base">
                Original Price:
              </p>
              <p className="text-primaryblack font-light text-base">
                ₹{cartOldPrice}
              </p>
            </div>
            <div className="flex flex-row w-full justify-between border-b-2 pb-4 border-gray-400 my-1">
              <p className="text-primaryblack font-light text-base">
                Discounts:
              </p>
              <p className="text-primaryblack font-light text-base">
                -₹{cartOldPrice - cartNewPrice}
              </p>
            </div>
            <div className="flex flex-row w-full justify-between my-3">
              <p className="text-primaryblack font-bold text-2xl">Total:</p>
              <p className="text-primaryblack font-bold text-2xl">
                ₹{cartNewPrice}
              </p>
            </div>
            <p className="text-xs font-light text-center">
              By completing your purchase you agree to these{" "}
              <a
                href="https://www.udemy.com/terms/"
                target={"_blank"}
                rel="noreferrer"
              >
                <span className="text-findemypurple">Terms of Service.</span>
              </a>
            </p>
            {selectedPaymentMode !== "card" &&
              selectedPaymentMode !== "upi" && (
                <div className="flex w-full justify-end">
                  <button
                    onClick={() => handleCheckout()}
                    className="p-3 bg-findemypurple focus:outline-none rounded-sm hover:opacity-90 w-full mx-auto my-3 text-white font-semibold text-sm"
                  >
                    Complete Checkout
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>

      <FooterComponent />
    </>
  );
};

export default Checkoutpage;
