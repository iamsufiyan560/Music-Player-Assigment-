const Title = ({ isForYou, handleClickForYou, handleClickTopTracks }) => {
  return (
    <>
      <div
        className="flex sticky sm:top-28 pt-0      pl-8 sm:pt-0  md:pt-0  lg:pt-8  pb-2 text-xl gap-4 cursor-pointer 
      top-28
      md:top-28 
      xl:top-0 
      lg:top-0
      z-50 backdrop-blur-md
      
      "
      >
        <span
          onClick={handleClickForYou}
          className={`text-white font-semibold ${
            isForYou ? "opacity-100" : "opacity-50"
          }`}
        >
          For You
        </span>
        <span
          onClick={handleClickTopTracks}
          className={`text-white font-semibold ${
            isForYou ? "opacity-50" : "opacity-100"
          }`}
        >
          Top Tracks
        </span>
      </div>
    </>
  );
};

export default Title;
