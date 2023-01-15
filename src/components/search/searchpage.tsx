import { SearchcardComponent, Searchcardloader } from ".";
import { FooterComponent, NavbarComponent } from "../shared";

import { useEffect, useMemo, useState } from "react";
import { getSearchedCourses } from "../../utils/api";
import { useLocation } from "react-router-dom";

interface SearchcardProps {
  //   onCardClick: () => void;
  //   link: activeLinkProps;
  //   onDeleteCard: (_id: string, closeModal: () => void) => void;
  id: string;
  courseSlug: string;
  imageurl: string;
  title: string;
  instructorName: string;
  rating: string;
  votes: string;
  price: number;
  oldPrice: number;
  category: string;
  tag?: string;
  level?: string;
}

const Searchpage = (): JSX.Element => {
  const [searchCardData, setSearchCardData] = useState<SearchcardProps[]>();
  const [resultLength, setResultLength] = useState<number>();
  const [searchDataLoaded, setSearchDataLoaded] = useState<boolean>(false);

  const useQuery = () => {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  };

  const query = useQuery();
  const searchString = query.get("query");

  useEffect(() => {
    fetchCourses();
  }, [searchString]);

  const fetchCourses = async () => {
    const _res = await getSearchedCourses(searchString);
    if (_res) {
      setSearchCardData(_res.data);
      setResultLength(_res.data.length);
      setSearchDataLoaded(true);
    }
  };
  return (
    <>
      <NavbarComponent />
      <div className="py-10 px-4 lg:px-44 font-bold text-2xl">
        <h1 className="mb-4">
          {resultLength} result{resultLength > 1 && "s"} for "{searchString}"
        </h1>

        <div className="flex min-h-screen flex-row bg-gray-100 text-gray-800 mt-2 lg:mt-12">
          <aside className="hidden md:block w-48 -translate-x-full transform bg-white transition-transform duration-150 ease-in md:translate-x-0">
            <h2>Filters</h2>
            <p className="text-lg font-semibold mt-4">Level</p>
            <div className="flex flex-col">
              <div className="flex flex-row my-2">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />
                <label
                  className="text-base font-normal mx-1"
                  htmlFor="vehicle1"
                >
                  {" "}
                  Beginner
                </label>
              </div>
              <div className="flex flex-row my-2">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />
                <label
                  className="text-base font-normal mx-1"
                  htmlFor="vehicle1"
                >
                  {" "}
                  All levels
                </label>
              </div>
              <div className="flex flex-row my-2">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />
                <label
                  className="text-base font-normal mx-1"
                  htmlFor="vehicle1"
                >
                  {" "}
                  Intermediate
                </label>
              </div>
              <div className="flex flex-row my-2">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />
                <label
                  className="text-base font-normal mx-1"
                  htmlFor="vehicle1"
                >
                  {" "}
                  Expert
                </label>
              </div>
            </div>
          </aside>

          <main className="main -ml-0 md:ml-0 flex flex-grow flex-col bg-white p-1 lg:p-4 transition-all duration-150 ease-in">
            {!searchDataLoaded && (
              <>
                <div className="hidden lg:flex flex-col space-y-5">
                  <Searchcardloader />
                  <Searchcardloader />
                  <Searchcardloader />
                  <Searchcardloader />
                </div>
                <div className="block lg:hidden">
                  <Searchcardloader />
                </div>
              </>
            )}

            {searchCardData?.length > 0 && searchDataLoaded ? (
              searchCardData?.map((data) => {
                return (
                  <div key={data.id} className="px-2">
                    <SearchcardComponent
                      id={data?.id}
                      imageurl={data?.imageurl}
                      title={data?.title}
                      courseSlug={data?.courseSlug}
                      instructorName={data?.instructorName}
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
              })
            ) : (
              <>
                <div className="flex flex-col w-full items-center justify-center">
                  <h1 className="text-4xl">🫤</h1>
                  <p>No relevant search results found!</p>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default Searchpage;
