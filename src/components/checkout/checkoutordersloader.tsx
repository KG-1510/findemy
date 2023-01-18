const Checkoutordersloader = (): JSX.Element => {
  return (
    <>
      <div className="w-full flex items-center flex-row bg-white">
        <div className="flex flex-row w-full bg-white shadow-md rounded-md items-center">
          <div
            data-placeholder=""
            className="h-20 w-52 overflow-hidden relative bg-gray-200"
          />
          <div className="flex flex-col p-4 w-full">
            <div className="flex">
              <div
                data-placeholder=""
                className=" flex h-2 w-5 overflow-hidden relative bg-gray-200 mr-1"
              />
              <div
                data-placeholder=""
                className="flex h-2 w-8/12 overflow-hidden relative bg-gray-200"
              />
            </div>
            <div className="flex mt-1">
              <div
                data-placeholder=""
                className="flex h-2 w-5 overflow-hidden relative bg-gray-200 mr-1"
              />
              <div
                data-placeholder=""
                className="flex h-2 w-8/12 overflow-hidden relative bg-gray-200"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkoutordersloader;
