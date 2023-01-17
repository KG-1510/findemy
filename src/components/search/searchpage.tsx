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
  const [searchCardDataCopy, setSearchCardDataCopy] =
    useState<SearchcardProps[]>();
  const [resultLength, setResultLength] = useState<number>();
  const [searchDataLoaded, setSearchDataLoaded] = useState<boolean>(false);
  const [appliedFilters, setAppliedFilters] = useState<any>([]);

  const useQuery = () => {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  };

  const query = useQuery();
  const searchString = query.get("query");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCourses();
  }, [searchString]);

  const fetchCourses = async () => {
    const _res = await getSearchedCourses(searchString);
    if (_res) {
      setSearchCardData(_res.data);
      setSearchCardDataCopy(_res.data);
      setResultLength(_res.data.length);
      setSearchDataLoaded(true);
    }
  };

  const handleFilterChange = (e) => {
    if (!appliedFilters.includes(e.target.value)) {
      appliedFilters.push(e.target.value);
    } else {
      const index = appliedFilters.indexOf(e.target.value);
      if (index > -1) {
        appliedFilters.splice(index, 1);
      }
    }

    if (appliedFilters.length !== 0) {
      renderFilteredResults(appliedFilters);
    } else {
      setSearchCardData(searchCardDataCopy);
    }
  };

  const renderFilteredResults = (appliedFilters) => {
    const _data = searchCardDataCopy.filter((item) => {
      return appliedFilters.includes(item.level);
    });
    setSearchCardData(_data);
  };

  return (
    <>
      <NavbarComponent />
      <div className="py-10 px-4 lg:px-44 font-bold text-2xl">
        <h1 className="mb-4">
          {resultLength} result{resultLength > 1 && "s"} for "{searchString}"
        </h1>
        {appliedFilters.length > 0 && (
          <p className="text-base font-light">
            {searchCardData?.length} results for filter - Level:{" "}
            {appliedFilters?.map((item) => {
              return (
                <span className="font-semibold">
                  {item}
                  {", "}
                </span>
              );
            })}
          </p>
        )}

        <div className="flex min-h-screen flex-col lg:flex-row bg-gray-100 text-gray-800 mt-2 lg:mt-12">
          <aside className="block w-full lg:w-48 translate-x-0 md:translate-x-0 transform bg-white transition-transform duration-150 ease-in">
            <h2>Filters</h2>
            <p className="text-lg font-semibold mt-4">Level</p>
            <div className="flex flex-col">
              <div className="flex flex-row my-2">
                <input
                  type="checkbox"
                  id="beginner-checkbox"
                  name="course-filter"
                  value="Beginner"
                  onChange={(e) => handleFilterChange(e)}
                />
                <label
                  className="text-base font-normal mx-1"
                  htmlFor="beginner-filter"
                >
                  {" "}
                  Beginner
                </label>
              </div>
              <div className="flex flex-row my-2">
                <input
                  type="checkbox"
                  id="all-levels-checkbox"
                  name="course-filter"
                  value="All levels"
                  onChange={(e) => handleFilterChange(e)}
                />
                <label
                  className="text-base font-normal mx-1"
                  htmlFor="all-levels-filter"
                >
                  {" "}
                  All levels
                </label>
              </div>
              <div className="flex flex-row my-2">
                <input
                  type="checkbox"
                  id="intermediate-checkbox"
                  name="course-filter"
                  value="Intermediate"
                  onChange={(e) => handleFilterChange(e)}
                />
                <label
                  className="text-base font-normal mx-1"
                  htmlFor="intermediate-checkbox"
                >
                  {" "}
                  Intermediate
                </label>
              </div>
              <div className="flex flex-row my-2">
                <input
                  type="checkbox"
                  id="expert-checkbox"
                  name="course-filter"
                  value="Expert"
                  onChange={(e) => handleFilterChange(e)}
                />
                <label
                  className="text-base font-normal mx-1"
                  htmlFor="expert-checkbox"
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
                <div className="block lg:hidden space-y-5">
                  <Searchcardloader />
                  <Searchcardloader />
                  <Searchcardloader />
                  <Searchcardloader />
                </div>
              </>
            )}

            {searchCardData?.length > 0 && searchDataLoaded ? (
              searchCardData?.map((data) => {
                return (
                  <div key={data?.id} className="px-2">
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
                {searchDataLoaded && (
                  <div className="flex flex-col w-full items-center justify-center">
                    <h1 className="text-4xl">🫤</h1>
                    <p>No relevant search results found!</p>
                  </div>
                )}
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
