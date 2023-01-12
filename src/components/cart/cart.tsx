import { FooterComponent, NavbarComponent } from "../shared";
import { CartcardComponent } from ".";

// TODO: To replace with API call of searched items
import coursecards from "../../dummy/coursecards.json";

const Cartpage = (): JSX.Element => {
  return (
    <>
      <NavbarComponent />
      <div className="py-10 px-4 lg:px-44 font-bold">
        <h1 className="mb-4 text-3xl">Shopping Cart</h1>
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col w-full lg:w-9/12">
            <p className="text-base text-gray-500 font-normal mb-8">
              2 Courses in Cart
            </p>
            {coursecards.map((data) => {
              return (
                <div key={data.id} className="px-2">
                  <CartcardComponent
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
          </div>
          <div className="flex flex-col w-full lg:w-3/12 p-4">
            <p className="text-gray-500 font-normal text-lg">Total:</p>
            <h1 className="font-bold text-3xl my-2">₹1,098</h1>
            <p className="text-gray-500 font-normal text-sm line-through">
              ₹8,999
            </p>
            {/* TODO: Percentage discount checking utility */}
            <p className="text-gray-500 font-normal text-sm">87% off</p>
            <button className="p-3 bg-findemypurple hover:opacity-90 w-full my-3 text-white font-semibold text-sm">
              Checkout
            </button>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default Cartpage;
