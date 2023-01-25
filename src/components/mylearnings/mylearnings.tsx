import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../utils/api";
import { CoursedetailsProps, UserDataProps } from "../../utils/interface";
import { Coursecardloader } from "../homepage";
import {
  CoursecardComponent,
  FooterComponent,
  NavbarComponent,
} from "../shared";

const MylearningsComponent = (): JSX.Element => {
  const [cookie, _] = useCookies(["authToken"]);
  const [purchasedCardsData, setPurchasedCardsData] = useState<any>([]);
  const [purchasedCardsDataCopy, setPurchasedCardsDataCopy] = useState<any>([]);
  const [purchasedCardsLoaded, setPurchasedCardsLoaded] =
    useState<boolean>(false);

  const fetchPurchasedItems = async (authToken: string, userId: string) => {
    const _res = await getUserProfile(authToken, userId);
    if (_res) {
      setPurchasedCardsData(_res?.data?.coursesEnrolled);
      setPurchasedCardsDataCopy(_res?.data?.coursesEnrolled);
      setPurchasedCardsLoaded(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cookie?.authToken) {
      const _data: UserDataProps | null = JSON.parse(
        localStorage.getItem("userData")!
      );
      fetchPurchasedItems(cookie?.authToken, _data?._id!);
    }
  }, []);

  const handleSearch = (e: any) => {
    if (e.target.value !== "") {
      const searchedItems = purchasedCardsDataCopy.filter(
        (item: CoursedetailsProps) => {
          return item.title
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        }
      );
      setPurchasedCardsData(searchedItems);
    } else if (e.target.value === "") {
      setPurchasedCardsData(purchasedCardsDataCopy);
    }
  };
  return (
    <>
      <NavbarComponent />
      <h1 className="mb-4 w-full px-10 lg:px-44 py-10 lg:py-16 text-3xl text-white bg-primaryblack">
        My learnings
        <p className="text-white font-light text-xs lg:text-sm my-2">
          Here is the list of all the courses you are currently enrolled in
        </p>
      </h1>
      <div className="pt-4 pb-14 px-4 lg:px-44 font-bold">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-[#f8fafb] flex w-full lg:w-2/3 border border-primaryblack rounded-3xl py-5 flex-1 h-10 mt-2 mb-4 items-center"
        >
          <AiOutlineSearch className="h-5 mx-4 text-gray-400" />
          <input
            type="search"
            onKeyUp={(e) => handleSearch(e)}
            aria-label="Search"
            placeholder="Search for anything"
            className="bg-transparent text-sm font-normal outline-none p-2 w-full"
          />
        </form>
        {purchasedCardsData?.length === 0 &&
          purchasedCardsData &&
          purchasedCardsLoaded && (
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
              {purchasedCardsData?.map((data: CoursedetailsProps) => {
                return (
                  <>
                    <div key={data?._id} className="px-2 animate-fadeIn">
                      <CoursecardComponent
                        _id={data?._id}
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
