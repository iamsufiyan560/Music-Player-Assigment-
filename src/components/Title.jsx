const Title = ({ isForYou, handleClickForYou, handleClickTopTracks }) => {
  return (
    <>
      <div className="flex sticky top-0   z-50 backdrop-blur-md  pl-8 sm:pt-8  md:pt-0  lg:pt-8  pb-2 text-xl gap-4 cursor-pointer">
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
