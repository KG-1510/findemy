import { FooterComponent, NavbarComponent } from "../shared";
import { AiFillLock } from "react-icons/ai";
import { useState } from "react";

const Checkoutpage = (): JSX.Element => {
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<string>("");
  const handlePaymentMode = (e: any) => {
    console.log(e.target.value);
    setSelectedPaymentMode(e.target.value);
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
                  name="country"
                  type="text"
                  placeholder="Country"
                  value={"India"}
                  disabled={true}
                  className="w-full px-4 py-2 opacity-80 cursor-not-allowed border border-black"
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
                  <option value={"Maharashtra"}>Maharashtra</option>
                  <option value={"Karnataka"}>Karnataka</option>
                  <option value={"Andaman and Nicobar"}>
                    Andaman and Nicobar
                  </option>
                  <option value={"Gujarat"}>Gujarat</option>
                  <option value={"Tamil Nadu"}>Tamil Nadu</option>
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
                    <div className="overflow-hidden bg-white leading-normal p-4">
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
                        />
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
                          className="w-full text-base font-normal px-4 py-2 focus:outline-none border border-black"
                        />
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
                          />
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
                          />
                        </div>
                      </div>
                    </div>
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
                        <label
                          htmlFor="upiID"
                          className="flex flex-row justify-between mb-1 mt-2 text-sm font-semibold text-primaryblack"
                        >
                          UPI ID / VPA
                        </label>
                        <input
                          name="upiID"
                          type="text"
                          placeholder="johndoe@okbank"
                          className="w-full text-base font-normal px-4 py-2 focus:outline-none border border-black"
                        />
                        <div className="flex w-full justify-end">
                          <button className="p-3 bg-findemypurple hover:opacity-90 w-8/12 mx-auto my-3 text-white font-semibold text-sm">
                            Make Payment
                          </button>
                        </div>
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
                      value={"netBanking"}
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
                  {selectedPaymentMode === "netBanking" && (
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
                      value={"mobileWallets"}
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
                  {selectedPaymentMode === "mobileWallets" && (
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
            {/* TODO: To fetch from /cart and show the orders in simple cards */}
          </div>
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-4/12 bg-blue-50 h-auto lg:h-screen p-4">
            <h3 className="mb-4 font-bold text-xl text-heading">Summary</h3>
            <div className="flex flex-row w-full justify-between my-1">
              <p className="text-primaryblack font-light text-base">
                Original Price:
              </p>
              <p className="text-primaryblack font-light text-base">₹4,543</p>
            </div>
            <div className="flex flex-row w-full justify-between border-b-2 pb-4 border-gray-400 my-1">
              <p className="text-primaryblack font-light text-base">
                Discounts:
              </p>
              <p className="text-primaryblack font-light text-base">-₹1,222</p>
            </div>
            <div className="flex flex-row w-full justify-between my-3">
              <p className="text-primaryblack font-bold text-2xl">Total:</p>
              <p className="text-primaryblack font-bold text-2xl">₹9,543</p>
            </div>
            <p className="text-xs font-light">
              By completing your purchase you agree to these{" "}
              <a
                href="https://www.udemy.com/terms/"
                target={"_blank"}
                rel="noreferrer"
              >
                <span className="text-findemypurple">Terms of Service.</span>
              </a>
            </p>
            <div className="flex w-full justify-end">
              <button className="p-3 bg-findemypurple rounded-sm hover:opacity-90 w-full mx-auto my-3 text-white font-semibold text-sm">
                Complete Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <FooterComponent />
    </>
  );
};

export default Checkoutpage;