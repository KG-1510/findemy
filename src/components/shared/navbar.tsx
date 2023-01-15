import { AiOutlineSearch } from "react-icons/ai";
import { BiCartAlt } from "react-icons/bi";
import { VscGlobe } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = (): JSX.Element => {
  const navigate = useNavigate();
  const [showSearchBarMobile, setShowSearchBarMobile] =
    useState<boolean>(false);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/search?query=${e.target.value}`);
    }
  };
  return (
    <>
      <nav className="flex space-x-4 bg-white h-[4.4rem] shadow-lg text-center justify-between items-center px-4">
        <GiHamburgerMenu className="h-6 w-6 md:hidden" />
        <Link to={"/"}>
          <h2 className="text-3xl font-bold hover:cursor-pointer">
            F<span className="text-findemypurple">i</span>ndemy
          </h2>
        </Link>
        <form className="hidden bg-[#f8fafb] md:flex border border-primaryblack rounded-3xl py-5 flex-1 h-1/2 items-center">
          <AiOutlineSearch className="h-5 mx-4 text-gray-400" />
          <input
            type="search"
            onKeyDown={(e) => handleSearch(e)}
            aria-label="Search"
            placeholder="Search for anything"
            className="bg-transparent text-sm font-normal outline-none p-2 w-full"
          />
        </form>
        <div className="flex">
          <button
            onClick={() => setShowSearchBarMobile(true)}
            className="w-10 h-10 flex md:hidden items-center justify-center hover:bg-[#F5F5F5]"
          >
            <AiOutlineSearch className="h-5 w-5" />
          </button>

          <Link to={"/cart"}>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F5F5]">
              <BiCartAlt className="h-5 w-5" />
            </button>
          </Link>
        </div>
        <div className="hidden md:flex pr-4 space-x-4 justify-end">
          <Link to={"/login"}>
            <button className="border border-primaryblack text-sm h-10 font-bold w-20 hover:bg-[#F5F5F5]">
              Log In
            </button>
          </Link>
          <Link to={"/signup"}>
            <button className="border bg-primaryblack text-white border-back text-sm h-10 font-bold w-20 hover:opacity-90">
              Sign up
            </button>
          </Link>
          <button className="border border-primaryblack w-10 flex items-center justify-center hover:bg-[#F5F5F5]">
            <VscGlobe className="h-5 w-5" />
          </button>
        </div>
      </nav>
      {showSearchBarMobile && (
        <div className="p-2 bg-white drop-shadow-md">
          <form className="flex bg-[#f8fafb] md:hidden w-full border border-primaryblack rounded-3xl py-5 flex-1 h-10 items-center">
            <AiOutlineSearch className="h-5 mx-4 text-gray-400" />
            <input
              type="search"
              onKeyDown={(e) => handleSearch(e)}
              aria-label="Search"
              placeholder="Search for anything"
              className="bg-transparent text-sm font-normal outline-none p-2 w-full"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default Navbar;
