// SearchBar.jsx
import { CiSearch } from "react-icons/ci";
import { useSetRecoilState } from "recoil";
import sidebarAtom from "../atoms/sidebarAtom";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const setSidebar = useSetRecoilState(sidebarAtom);

  return (
    <div className="p-8 z-50 backdrop-blur-lg sm:fixed w-auto  sm:w-[300px] lg:w-fit md:w-[400px]  fixed md:fixed lg:block lg:pt-8  sm:pt-2 pt-4   ">
      <div className="relative">
        <input
          className="p-2 pl-10 pr-8 w-full rounded-md bg-[#FFFFFF14] placeholder-white"
          type="text"
          placeholder="Search Song, Artist"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setSidebar(true)}
        />
        <CiSearch
          size={20}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default SearchBar;
