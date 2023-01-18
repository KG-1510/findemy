import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../utils/api";
import { Checkoutordersloader } from "../checkout";
import { Coursecardloader } from "../homepage";
import {
  CoursecardComponent,
  FooterComponent,
  NavbarComponent,
} from "../shared";

const MylearningsComponent = (): JSX.Element => {
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
  return (
    <>
      <NavbarComponent />
      <h1 className="mb-4 w-full px-10 lg:px-44 py-10 lg:py-16 text-3xl text-white bg-primaryblack">
        My learnings
        <p className="text-white font-light text-xs lg:text-sm my-2">
          Here is the list of all the courses you are currently enrolled in
        </p>
      </h1>
      <div className="py-10 px-4 lg:px-44 font-bold">
        {purchasedCardsData?.length === 0 && purchasedCardsData && (
          <div className="flex flex-col w-full items-center justify-center my-10">
            <h1 className="text-4xl">🫤</h1>
            <p className="text-center">
              You have not enrolled into any course! Purchase a course today!
            </p>
            <Link to={"/"}>
              <button className="p-3 bg-findemypurple hover:opacity-90 w-full my-3 text-white font-semibold text-sm">
                Keep Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {purchasedCardsLoaded ? (
            <>
              {purchasedCardsData?.map((data) => {
                return (
                  <>
                    <div key={data?._id} className="px-2">
                      <CoursecardComponent
                        id={data?._id}
                        imageurl={data?.imageurl}
                        title={data?.title}
                        courseSlug={data?.courseSlug}
                        instructorName={data?.instructorName}
                        rating={data?.rating}
                        votes={data?.votes}
                        category={data?.category}
                        tag={data?.tag}
                        level={data?.level}
                      />
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <>
              <div className="hidden lg:flex flex-row space-x-3">
                <Coursecardloader />
                <Coursecardloader />
                <Coursecardloader />
                <Coursecardloader />
              </div>
              <div className="flex flex-col items-center justify-center mx-auto lg:hidden">
                <Coursecardloader />
              </div>
            </>
          )}
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default MylearningsComponent;
