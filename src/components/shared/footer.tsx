import { Link } from "react-router-dom";

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-primaryblack">
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
        </div>
      </div>
      <Link to={"/"}>
        <div className="bg-primaryblack">
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
