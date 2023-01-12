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
            <div className="my-2">
              <a className="text-findemypurple underline text-sm" href="/">
                Python
              </a>
              <p className="text-gray-500 text-xs font-light">
                1,80,987 students
              </p>
            </div>

            <div className="my-2">
              <a className="text-findemypurple underline text-sm" href="/">
                Web Development
              </a>
              <p className="text-gray-500 text-xs font-light">
                1,80,987 students
              </p>
            </div>

            <div className="my-2">
              <a className="text-findemypurple underline text-sm" href="/">
                Machine Learning
              </a>
              <p className="text-gray-500 text-xs font-light">
                1,80,987 students
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-primaryblack text-lg mt-6 lg:mt-0">Business</h1>
            <div className="my-2">
              <a className="text-findemypurple underline text-sm" href="/">
                Financial Analysis
              </a>
              <p className="text-gray-500 text-xs font-light">
                1,80,987 students
              </p>
            </div>

            <div className="my-2">
              <a className="text-findemypurple underline text-sm" href="/">
                SQL
              </a>
              <p className="text-gray-500 text-xs font-light">
                1,80,987 students
              </p>
            </div>

            <div className="my-2">
              <a className="text-findemypurple underline text-sm" href="/">
                PMP
              </a>
              <p className="text-gray-500 text-xs font-light">
                1,80,987 students
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-primaryblack text-lg mt-6 lg:mt-0">
              IT & Software
            </h1>
            <div className="my-2">
              <a className="text-findemypurple underline text-sm" href="/">
                AWS Certification
              </a>
              <p className="text-gray-500 text-xs font-light">
                1,80,987 students
              </p>
            </div>

            <div className="my-2">
              <a className="text-findemypurple underline text-sm" href="/">
                Ethical Hacking
              </a>
              <p className="text-gray-500 text-xs font-light">
                1,80,987 students
              </p>
            </div>

            <div className="my-2">
              <a className="text-findemypurple underline text-sm" href="/">
                Cyber Security
              </a>
              <p className="text-gray-500 text-xs font-light">
                1,80,987 students
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-primaryblack text-lg mt-6 lg:mt-0">Design</h1>
            <div className="my-2">
              <a className="text-findemypurple underline text-sm" href="/">
                Photoshop
              </a>
              <p className="text-gray-500 text-xs font-light">
                1,80,987 students
              </p>
            </div>

            <div className="my-2">
              <a className="text-findemypurple underline text-sm" href="/">
                Graphic Design
              </a>
              <p className="text-gray-500 text-xs font-light">
                1,80,987 students
              </p>
            </div>

            <div className="my-2">
              <a className="text-findemypurple underline text-sm" href="/">
                Drawing
              </a>
              <p className="text-gray-500 text-xs font-light">
                1,80,987 students
              </p>
            </div>
          </div>
        </div>
        <button className="border border-primaryblack text-sm h-10 font-bold px-2 my-3 hover:opacity-70">
          Explore more topics
        </button>
      </div>
    </>
  );
};

export default Categorytopics;
