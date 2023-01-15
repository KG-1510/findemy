import { Link } from "react-router-dom";

const Categorytopics = (): JSX.Element => {
  return (
    <>
      <div className="py-10 px-4 lg:px-44 font-bold text-2xl bg-blue-50">
        <h1 className="mb-4">Featured topics by category</h1>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="text-primaryblack text-lg mt-6 lg:mt-0">
              Development
            </h1>
            <Link to={`/search?query=python`}>
              <div className="my-2">
                <p className="text-findemypurple underline text-sm">Python</p>
                <p className="text-gray-500 text-xs font-light">
                  1,80,987 students
                </p>
              </div>
            </Link>
            <Link to={`/search?query=web development`}>
              <div className="my-2">
                <p className="text-findemypurple underline text-sm">
                  Web Development
                </p>
                <p className="text-gray-500 text-xs font-light">
                  1,80,987 students
                </p>
              </div>
            </Link>

            <Link to={`/search?query=machine learning`}>
              <div className="my-2">
                <p className="text-findemypurple underline text-sm">
                  Machine Learning
                </p>
                <p className="text-gray-500 text-xs font-light">
                  1,80,987 students
                </p>
              </div>
            </Link>
          </div>

          <div className="flex flex-col">
            <h1 className="text-primaryblack text-lg mt-6 lg:mt-0">Business</h1>
            <Link to={`/search?query=financial analysis`}>
              <div className="my-2">
                <p className="text-findemypurple underline text-sm">
                  Financial Analysis
                </p>
                <p className="text-gray-500 text-xs font-light">
                  1,80,987 students
                </p>
              </div>
            </Link>

            <Link to={`/search?query=sql`}>
              <div className="my-2">
                <p className="text-findemypurple underline text-sm">SQL</p>
                <p className="text-gray-500 text-xs font-light">
                  1,80,987 students
                </p>
              </div>
            </Link>

            <Link to={`/search?query=pmp`}>
              <div className="my-2">
                <p className="text-findemypurple underline text-sm">PMP</p>
                <p className="text-gray-500 text-xs font-light">
                  1,80,987 students
                </p>
              </div>
            </Link>
          </div>

          <div className="flex flex-col">
            <h1 className="text-primaryblack text-lg mt-6 lg:mt-0">
              IT & Software
            </h1>
            <Link to={`/search?query=aws certification`}>
              <div className="my-2">
                <p className="text-findemypurple underline text-sm">
                  AWS Certification
                </p>
                <p className="text-gray-500 text-xs font-light">
                  1,80,987 students
                </p>
              </div>
            </Link>

            <Link to={`/search?query=ethical hacking`}>
              <div className="my-2">
                <p className="text-findemypurple underline text-sm">
                  Ethical Hacking
                </p>
                <p className="text-gray-500 text-xs font-light">
                  1,80,987 students
                </p>
              </div>
            </Link>

            <Link to={`/search?query=cyber security`}>
              <div className="my-2">
                <p className="text-findemypurple underline text-sm">
                  Cyber Security
                </p>
                <p className="text-gray-500 text-xs font-light">
                  1,80,987 students
                </p>
              </div>
            </Link>
          </div>

          <div className="flex flex-col">
            <h1 className="text-primaryblack text-lg mt-6 lg:mt-0">Design</h1>
            <Link to={`/search?query=photoshop`}>
              <div className="my-2">
                <p className="text-findemypurple underline text-sm">
                  Photoshop
                </p>
                <p className="text-gray-500 text-xs font-light">
                  1,80,987 students
                </p>
              </div>
            </Link>

            <Link to={`/search?query=graphic design`}>
              <div className="my-2">
                <p className="text-findemypurple underline text-sm">
                  Graphic Design
                </p>
                <p className="text-gray-500 text-xs font-light">
                  1,80,987 students
                </p>
              </div>
            </Link>

            <Link to={`/search?query=drawing`}>
              <div className="my-2">
                <p className="text-findemypurple underline text-sm">Drawing</p>
                <p className="text-gray-500 text-xs font-light">
                  1,80,987 students
                </p>
              </div>
            </Link>
          </div>
        </div>
        <a
          href="https://www.udemy.com/courses/development/"
          target={"_blank"}
          rel="noreferrer"
        >
          <button className="border border-primaryblack text-sm h-10 font-bold px-2 my-3 hover:opacity-70">
            Explore more topics
          </button>
        </a>
      </div>
    </>
  );
};

export default Categorytopics;
