const Coursecardloader = (): JSX.Element => {
  return (
    <>
      <div className="w-full flex items-center flex-col bg-white">
        <div className="flex flex-col bg-white shadow-md rounded-md items-center">
          <div
            data-placeholder=""
            className="h-52 w-full overflow-hidden relative bg-gray-200"
          />
          <div className="flex flex-col p-4">
            <div className="flex">
              <div
                data-placeholder=""
                className=" flex h-5 w-5 overflow-hidden relative bg-gray-200 mr-1"
              />
              <div
                data-placeholder=""
                className="flex h-5 w-48 overflow-hidden relative bg-gray-200"
              />
            </div>
            <div className="flex mt-1">
              <div
                data-placeholder=""
                className="flex h-5 w-5 overflow-hidden relative bg-gray-200 mr-1"
              />
              <div
                data-placeholder=""
                className="flex h-5 w-48 overflow-hidden relative bg-gray-200"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coursecardloader;