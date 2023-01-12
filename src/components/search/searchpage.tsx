import { SearchcardComponent } from ".";
import { FooterComponent, NavbarComponent } from "../shared";

// TODO: To replace with API call of searched items
import coursecards from "../../dummy/coursecards.json";

const Searchpage = (): JSX.Element => {
  return (
    <>
      <NavbarComponent />
      <div className="py-10 px-4 lg:px-44 font-bold text-2xl">
        <h1 className="mb-4">4,123 results for "web development"</h1>

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

          <main className="main -ml-0 md:ml-0 flex flex-grow flex-col bg-white p-4 transition-all duration-150 ease-in">
            {coursecards.map((data) => {
              return (
                <div key={data.id} className="px-2">
                  <SearchcardComponent
                    id={data.id}
                    imageurl={data.imageurl}
                    title={data.title}
                    instructorName={data.instructorName}
                    rating={data.rating}
                    votes={data.votes}
                    price={data.price}
                    oldPrice={data.oldPrice}
                    category={data.category}
                    tag={data.tag}
                    level={data.level}
                  />
                </div>
              );
            })}
          </main>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default Searchpage;
