import { AiOutlineSearch } from "react-icons/ai";
import { BiCartAlt } from "react-icons/bi";
import { VscGlobe } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import { useCookies } from "react-cookie";
import { getUserCart, successHandler } from "../../utils/api";

const Navbar = (): JSX.Element => {
  const navigate = useNavigate();
  const [showSearchBarMobile, setShowSearchBarMobile] =
    useState<boolean>(false);
  const [cookie, _, removeCookie] = useCookies(["authToken"]);
  const [showNavbarDrawer, setShowNavbarDrawer] = useState<boolean>(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>();
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext);
  const [userData, setUserData] = useState<any>({});

  const fetchCartData = async (authToken: string, userId: string) => {
    const _res = await getUserCart(authToken, userId);
    if (_res) {
      setCartCount(_res?.data?.cart?.length);
    }
  };

  useEffect(() => {
    if (cookie?.authToken) {
      setIsUserLoggedIn(true);
      const _data = JSON.parse(localStorage.getItem("userData"));
      setUserData(_data);
      fetchCartData(cookie?.authToken, _data?._id);
    }
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.preventDefault();
      navigate(`/search?query=${e.target.value}`);
    }
  };

  const handleLogout = () => {
    removeCookie("authToken", { path: "/" });
    localStorage.removeItem("userData");
    setIsUserLoggedIn(false);
    navigate("/");
    successHandler("Logged out successfully!");
  };
  return (
    <>
      {showHamburgerMenu && (
        <>
          <div className="fixed w-full top-16 z-50 drop-shadow-lg p-4 bg-white flex flex-col">
            {isUserLoggedIn && (
              <>
                <div className="flex flex-col items-center justify-center p-2 w-full border-b">
                  <img
                    src={
                      userData?.imageurl
                        ? userData?.imageurl
                        : "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                    }
                    alt="profile"
                    className="h-24 w-24 rounded-full"
                  />
                  <div className="flex flex-col w-full text-center">
                    <p className="text-lg font-bold">{userData?.fullName}</p>
                    <p className="text-xs navbar-drawer-email font-light">
                      {userData?.email}
                    </p>
                  </div>
                  <div className="flex flex-col w-full space-y-2 text-center px-4 py-2">
                    <Link to={"/mylearnings"}>
                      <p className="text-lg font-light hover:text-findemypurple cursor-pointer py-1">
                        My learnings
                      </p>
                    </Link>
                    <Link to={"/cart"}>
                      <p className="text-lg font-light hover:text-findemypurple cursor-pointer py-1">
                        My cart
                      </p>
                    </Link>
                    <a
                      className="text-lg font-light hover:text-findemypurple cursor-pointer py-1"
                      href="https://about.udemy.com/company/?locale=en-us#offices"
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      Help
                    </a>
                    <p
                      onClick={() => handleLogout()}
                      className="text-lg font-light hover:text-findemypurple cursor-pointer py-1"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              </>
            )}
            {!isUserLoggedIn && (
              <>
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="my-2 flex flex-col w-full">
                    <h2>Popular Go-to links</h2>
                    <Link to={"/"}>
                      <p className="text-lg font-light hover:text-findemypurple cursor-pointer py-1">
                        Home
                      </p>
                    </Link>
                    <Link to={"/search?query=web development"}>
                      <p className="text-lg font-light hover:text-findemypurple cursor-pointer py-1">
                        Web Development
                      </p>
                    </Link>

                    <Link to={"/search?query=python"}>
                      <p className="text-lg font-light hover:text-findemypurple cursor-pointer py-1">
                        Python
                      </p>
                    </Link>

                    <Link to={"/search?query=pmp"}>
                      <p className="text-lg font-light hover:text-findemypurple cursor-pointer py-1">
                        PMP
                      </p>
                    </Link>

                    <Link to={"/search?query=photoshop"}>
                      <p className="text-lg font-light hover:text-findemypurple cursor-pointer py-1">
                        Photoshop
                      </p>
                    </Link>
                  </div>
                  <p className="my-2">Join the world of learning!</p>
                  <div className="flex flex-row space-x-4 items-center justify-center">
                    <Link to={"/login"}>
                      <button className="border border-primaryblack text-sm h-10 font-bold w-20 hover:bg-[#F5F5F5]">
                        Log In
                      </button>
                    </Link>
                    <Link to={"/signup"}>
                      <button className="bg-primaryblack text-white border-back text-sm h-10 font-bold w-20 hover:opacity-90">
                        Sign up
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
      <nav className="sticky top-0 z-50 flex space-x-4 bg-white h-[4.4rem] shadow-lg text-center justify-between items-center px-4">
        <span
          className="flex md:hidden h-10 w-10 focus:outline-none items-center justify-center"
          onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
        >
          <GiHamburgerMenu className="h-6 w-6" />
        </span>
        <Link to={"/"}>
          <h2 className="text-3xl font-bold hover:cursor-pointer">
            F<span className="text-findemypurple">i</span>ndemy
          </h2>
        </Link>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="hidden bg-[#f8fafb] md:flex border border-primaryblack rounded-3xl py-5 flex-1 h-1/2 items-center"
        >
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
          <span
            onClick={() => setShowSearchBarMobile(true)}
            className="w-10 h-10 flex md:hidden items-center justify-center hover:bg-[#F5F5F5]"
          >
            <AiOutlineSearch className="h-5 w-5" />
          </span>

          {isUserLoggedIn && (
            <>
              <Link to={"/mylearnings"}>
                <span className="hidden md:flex h-10 px-2 items-center text-sm font-light mx-2 justify-center hover:bg-[#F5F5F5]">
                  My learnings
                </span>
              </Link>
            </>
          )}

          {isUserLoggedIn && (
            <>
              <Link to={"/cart"}>
                <span className="w-10 h-10 relative flex items-center justify-center hover:bg-[#F5F5F5]">
                  <BiCartAlt aria-label="cart" className="h-5 w-5" />
                  {cartCount !== 0 && (
                    <span className="absolute top-6 right-0 bg-findemypurple rounded-full text-xs font-light text-white h-4 w-4">
                      {cartCount}
                    </span>
                  )}
                </span>
              </Link>
            </>
          )}
        </div>
        <div className="hidden md:flex pr-4 space-x-4 justify-end">
          {!isUserLoggedIn && (
            <>
              <Link to={"/login"}>
                <button className="border border-primaryblack text-sm h-10 font-bold w-20 hover:bg-[#F5F5F5]">
                  Log In
                </button>
              </Link>
              <Link to={"/signup"}>
                <button className="bg-primaryblack text-white border-back text-sm h-10 font-bold w-20 hover:opacity-90">
                  Sign up
                </button>
              </Link>
            </>
          )}
          {isUserLoggedIn ? (
            <>
              <button
                onClick={() => setShowNavbarDrawer(!showNavbarDrawer)}
                className="w-10 rounded-full flex items-center justify-center hover:bg-[#F5F5F5]"
              >
                <img
                  src={
                    userData?.imageurl
                      ? userData?.imageurl
                      : "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                  }
                  alt="profile"
                  className="rounded-full border border-primaryblack"
                />
              </button>
              {showNavbarDrawer && (
                <>
                  <div className="absolute w-60 flex flex-col bg-white z-50 drop-shadow-md top-16">
                    <div className="flex flex-row p-2 w-full border-b">
                      <img
                        src={
                          userData?.imageurl
                            ? userData?.imageurl
                            : "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                        }
                        alt="profile"
                        className="h-12 w-12 rounded-full"
                      />
                      <div className="flex flex-col w-full text-left ml-1">
                        <p className="text-lg font-bold">
                          {userData?.fullName}
                        </p>
                        <p className="text-xs navbar-drawer-email font-light">
                          {userData?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-4 text-left px-4 py-2">
                      <Link to={"/mylearnings"}>
                        <p className="text-sm font-light hover:text-findemypurple cursor-pointer">
                          My learnings
                        </p>
                      </Link>
                      <Link to={"/cart"}>
                        <p className="text-sm font-light hover:text-findemypurple cursor-pointer">
                          My cart
                        </p>
                      </Link>
                      <a
                        className="text-sm font-light hover:text-findemypurple cursor-pointer"
                        href="https://about.udemy.com/company/?locale=en-us#offices"
                        target={"_blank"}
                        rel="noreferrer"
                      >
                        Help
                      </a>
                      <p
                        onClick={() => handleLogout()}
                        className="text-sm font-light hover:text-findemypurple cursor-pointer"
                      >
                        Logout
                      </p>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <button className="border border-primaryblack w-10 flex items-center justify-center hover:bg-[#F5F5F5]">
              <VscGlobe className="h-5 w-5" />
            </button>
          )}
        </div>
      </nav>
      {showSearchBarMobile && (
        <div className="p-2 bg-white drop-shadow-md">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex bg-[#f8fafb] md:hidden w-full border border-primaryblack rounded-3xl py-5 flex-1 h-10 items-center"
          >
            <AiOutlineSearch className="h-5 mx-4 text-gray-400" />
            <input
              type="search"
              onKeyDown={(e) => {
                handleSearch(e);
              }}
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
