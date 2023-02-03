import { Link } from "react-router-dom";

const Checkoutnavbar = (): JSX.Element => {
  return (
    <>
      <nav className="sticky top-0 z-50 flex space-x-4 bg-white h-[4.4rem] shadow-lg text-center justify-between items-center px-4">
        <Link to={"/"}>
          <h2 className="text-3xl focus:outline-none font-bold hover:cursor-pointer">
            F<span className="text-findemypurple">i</span>ndemy
          </h2>
        </Link>

        <div className="flex pr-4 space-x-4 justify-end">
          <>
            <Link to={"/"}>
              <button className="text-findemypurple">Cancel</button>
            </Link>
          </>
        </div>
      </nav>
    </>
  );
};

export default Checkoutnavbar;
