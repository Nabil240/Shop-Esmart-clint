const WaitingLoader = () => {
  return (
    <div className="text-center flex items-center gap-3 z-50 md:p-8 p-4 left-[20%] right-[20%] fixed md:left-[40%] top-1/2 md:right-[40%] bg-gray-300 dark:bg-gray-700">
      <span className="loading loading-spinner loading-lg"></span> <span>Please Wait...</span>
    </div>
  );
};

export default WaitingLoader;
