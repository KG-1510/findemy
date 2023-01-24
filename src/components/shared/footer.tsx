import { VscGlobe } from "react-icons/vsc";
import { Link } from "react-router-dom";

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-primaryblack">
      <div className="hidden lg:flex flex-col lg:flex-row px-20 h-24 border-b border-gray-500 w-full justify-between">
        <p className="text-white font-semibold text-lg flex items-center">
          Top companies choose{" "}
          <a
            href="https://business.udemy.com/request-demo-in-mx/?locale=en_US&ref=footer-ad&user_type=mx&utm_method=0&utm_type=mx"
            target={"_blank"}
            rel="noreferrer"
          >
            <span className="text-findemypurple px-2 hover:underline cursor-pointer">
              {" "}
              Findemy Business{" "}
            </span>
          </a>
          to build in-demand career skills.
        </p>
        <div className="flex flex-row items-center justify-center space-x-3">
          <img
            alt="Nasdaq"
            height={44}
            width={115}
            src="https://s.udemycdn.com/partner-logos/v4/nasdaq-light.svg"
          />
          <img
            alt="Volkswagen"
            height={44}
            width={44}
            src="https://s.udemycdn.com/partner-logos/v4/volkswagen-light.svg"
          />
          <img
            alt="Box"
            height={44}
            width={67}
            src="https://s.udemycdn.com/partner-logos/v4/box-light.svg"
          />
          <img
            alt="NetApp"
            height={44}
            width={115}
            src="https://s.udemycdn.com/partner-logos/v4/netapp-light.svg"
          />
          <img
            alt="Eventbrite"
            height={44}
            width={115}
            src="https://s.udemycdn.com/partner-logos/v4/eventbrite-light.svg"
          />
        </div>
      </div>
      <div className="container px-5 py-14 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <nav className="list-none mb-10">
              <li className="my-2">
                <a
                  href="https://business.udemy.com/"
                  target={"_blank"}
                  rel="noreferrer"
                  className="text-white font-light text-sm hover:text-findemypurple"
                >
                  Findemy Business
                </a>
              </li>
              <li className="my-2">
                <a
                  href="https://www.udemy.com/teaching/?ref=teach_footer"
                  target={"_blank"}
                  rel="noreferrer"
                  className="text-white font-light text-sm hover:text-findemypurple"
                >
                  Teach on Findemy
                </a>
              </li>
              <li className="my-2">
                <a
                  href="https://www.udemy.com/mobile"
                  target={"_blank"}
                  rel="noreferrer"
                  className="text-white font-light text-sm hover:text-findemypurple"
                >
                  Get the app
                </a>
              </li>
              <li className="my-2">
                <a
                  href="https://about.udemy.com/company/?locale=en-us#offices"
                  target={"_blank"}
                  rel="noreferrer"
                  className="text-white font-light text-sm hover:text-findemypurple"
                >
                  About Us
                </a>
              </li>
              <li className="my-2">
                <a
                  href="https://about.udemy.com/company/?locale=en-us#offices"
                  target={"_blank"}
                  rel="noreferrer"
                  className="text-white font-light text-sm hover:text-findemypurple"
                >
                  Contact Us
                </a>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <nav className="list-none mb-10">
              <li className="my-2">
                <a
                  href="https://about.udemy.com/careers/?locale=en-us"
                  target={"_blank"}
                  rel="noreferrer"
                  className="text-white font-light text-sm hover:text-findemypurple"
                >
                  Careers
                </a>
              </li>
              <li className="my-2">
                <a
                  href="https://blog.udemy.com/"
                  target={"_blank"}
                  rel="noreferrer"
                  className="text-white font-light text-sm hover:text-findemypurple"
                >
                  Blog
                </a>
              </li>
              <li className="my-2">
                <a
                  href="https://support.udemy.com/hc/en-us"
                  target={"_blank"}
                  rel="noreferrer"
                  className="text-white font-light text-sm hover:text-findemypurple"
                >
                  Help and Support
                </a>
              </li>
              <li className="my-2">
                <a
                  href="https://www.udemy.com/affiliate/"
                  target={"_blank"}
                  rel="noreferrer"
                  className="text-white font-light text-sm hover:text-findemypurple"
                >
                  Affiliate
                </a>
              </li>
              <li className="my-2">
                <a
                  href="https://investors.udemy.com/"
                  target={"_blank"}
                  rel="noreferrer"
                  className="text-white font-light text-sm hover:text-findemypurple"
                >
                  Investors
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <nav className="list-none mb-10">
              <li className="my-2">
                <a
                  href="https://www.udemy.com/terms/"
                  target={"_blank"}
                  rel="noreferrer"
                  className="text-white font-light text-sm hover:text-findemypurple"
                >
                  Terms
                </a>
              </li>
              <li className="my-2">
                <a
                  href="https://www.udemy.com/terms/privacy/"
                  target={"_blank"}
                  rel="noreferrer"
                  className="text-white font-light text-sm hover:text-findemypurple"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="my-2">
                <a
                  href="https://www.udemy.com/teaching/?ref=teach_footer"
                  target={"_blank"}
                  rel="noreferrer"
                  className="text-white font-light text-sm hover:text-findemypurple"
                >
                  Cookie Settings
                </a>
              </li>
              <li className="my-2">
                <a
                  href="https://www.udemy.com/sitemap/"
                  target={"_blank"}
                  rel="noreferrer"
                  className="text-white font-light text-sm hover:text-findemypurple"
                >
                  Sitemap
                </a>
              </li>
              <li className="my-2">
                <a
                  href="https://about.udemy.com/accessibility-statement/?locale=en-us"
                  target={"_blank"}
                  rel="noreferrer"
                  className="text-white font-light text-sm hover:text-findemypurple"
                >
                  Accessibility statement
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full flex justify-center lg:justify-end items-start">
            <button className="border text-white bg-primaryblack border-white pl-4 pr-6 py-2 flex flex-row items-center justify-start  hover:opacity-80">
              <VscGlobe className="h-5 w-5 mx-1" />
              <p className="font-light">English</p>
            </button>
          </div>
        </div>
      </div>
      <Link to={"/"}>
        <div className="bg-primaryblack mb-16 lg:mb-0">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <h2 className="text-3xl text-white text-center lg:text-left font-bold hover:cursor-pointer">
              F<span className="text-findemypurple">i</span>ndemy
            </h2>
            <span className="inline-flex text-white font-normal text-sm sm:ml-auto sm:mt-0 mt-2 justify-center items-center">
              <p>© 2023 Findemy, Inc.</p>
            </span>
          </div>
        </div>
      </Link>
    </footer>
  );
};

export default Footer;
