import { SearchcardComponent, Searchcardloader } from ".";
import {
  FooterComponent,
  NavbarComponent,
  SpinnerloaderComponent,
} from "../shared";

import { useEffect, useMemo, useState } from "react";
import { getSearchedCourses } from "../../utils/api";
import { useLocation } from "react-router-dom";
import {
  CoursecardProps,
  CoursedetailsProps,
  SearchcardProps,
} from "../../utils/interface";

const Searchpage = (): JSX.Element => {
  const [searchCardData, setSearchCardData] = useState<SearchcardProps[]>();
  const [searchCardDataCopy, setSearchCardDataCopy] =
    useState<SearchcardProps[]>();
  const [resultLength, setResultLength] = useState<number>(0);
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
    const _res = await getSearchedCourses(searchString!);
    if (_res) {
      setSearchCardData(_res.data);
      setSearchCardDataCopy(_res.data);
      setResultLength(_res.data.length);
      setSearchDataLoaded(true);
    }
  };

  const handleFilterChange = (e: any) => {
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

  const renderFilteredResults = (appliedFilters: string[]) => {
    const _data = searchCardDataCopy!.filter((item: CoursecardProps) => {
      return appliedFilters.includes(item.level!);
    });
    setSearchCardData(_data);
  };

  return (
    <>
      <NavbarComponent />
      <div className="py-10 px-4 lg:px-44 font-bold text-2xl">
        {searchDataLoaded ? (
          <h1 className="mb-4">
            {resultLength} result{resultLength > 1 && "s"} for "{searchString}"
          </h1>
        ) : (
          <div className="h-16 flex items-center justify-center ">
            <SpinnerloaderComponent />
          </div>
        )}
        {appliedFilters.length > 0 && (
          <>
            <p className="text-base font-light animate-fadeIn">
              {searchCardData?.length} results for filter - Level:{" "}
              {appliedFilters?.map((item: string) => {
                return (
                  <span className="font-semibold">
                    {item}
                    {", "}
                  </span>
                );
              })}
            </p>
            <button className="text-sm" onClick={() => setAppliedFilters([])}>
              Clear all filters
            </button>
          </>
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
                  checked={appliedFilters.includes("Beginner")}
                  onChange={(e) => handleFilterChange(e)}
                />
                <label
                  className="text-base font-normal mx-1"
                  htmlFor="beginner-checkbox"
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
                  checked={appliedFilters.includes("All levels")}
                  onChange={(e) => handleFilterChange(e)}
                />
                <label
                  className="text-base font-normal mx-1"
                  htmlFor="all-levels-checkbox"
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
                  checked={appliedFilters.includes("Intermediate")}
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
                  checked={appliedFilters.includes("Expert")}
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

            {searchCardData?.length! > 0 && searchDataLoaded ? (
              searchCardData?.map((data) => {
                return (
                  <div key={data?._id} className="px-2 animate-fadeIn">
                    <SearchcardComponent
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
                      courseData={data}
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
