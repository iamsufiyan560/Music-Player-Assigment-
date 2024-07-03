import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SongList from "./SongList";
import Title from "./Title";
import TopTracks from "./TopTracks";
import SongInfo from "./SongInfo";
import { FaMusic } from "react-icons/fa";
import sidebarAtom from "../atoms/sidebarAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import MobileLogo from "./MobileLogo";
import { RxCross1 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";

const ForYou = () => {
  const [isForYou, setIsForYou] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSong, setSelectedSong] = useState(null);
  const sideBar = useRecoilValue(sidebarAtom);
  const setSidebar = useSetRecoilState(sidebarAtom);

  const handleClickForYou = () => {
    setIsForYou(true);
    setSidebar(true);
  };

  const handleClickTopTracks = () => {
    setIsForYou(false);
    setSidebar(true);
  };

  useEffect(() => {
    if (selectedSong) {
      setSidebar(false);
    }
  }, [selectedSong, setSidebar]);

  useEffect(() => {
    if (selectedSong) {
      document.title = `Music Player |  ${selectedSong.name} By ${selectedSong.artist} `;
    } else {
      document.title = "Music Player";
    }
  }, [selectedSong]);

  return (
    <div className="md:pt-0 h-screen lg:pt-0 overflow-y-auto scroll-smooth hide-scrollbar">
      <MobileLogo />

      <Title
        isForYou={isForYou}
        setIsForYou={setIsForYou}
        handleClickForYou={handleClickForYou}
        handleClickTopTracks={handleClickTopTracks}
      />
      <div className="lg:flex ">
        <div
          className={`lg:h-screen h-fit  w-96 flex flex-col shadow-lg border-fuchsia-950  `}
        >
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div
            className={`flex-grow overflow-y-auto scroll-smooth hide-scrollbar 
          ${
            !sideBar ? "sm:hidden md:hidden lg:block hidden " : "block "
          } sm:block md:block  `}
          >
            {isForYou ? (
              <SongList
                searchTerm={searchTerm}
                onSelectSong={setSelectedSong}
                selectedSong={selectedSong}
              />
            ) : (
              <TopTracks
                searchTerm={searchTerm}
                onSelectSong={setSelectedSong}
                selectedSong={selectedSong}
              />
            )}
          </div>
        </div>

        <div
          className={`  flex-grow sm:flex md:flex ${
            sideBar ? "sm:hidden md:hidden lg:block hidden" : "block"
          } sm:block md:block`}
        >
          {selectedSong ? (
            <SongInfo
              selectedSong={selectedSong}
              onSelectSong={setSelectedSong}
            />
          ) : (
            <div className="h-screen lg:ml-24 md:ml-32 sm:ml-28 ml-20 fixed top-20 ">
              <div className="  text-white flex flex-col flex-grow   items-center justify-center h-full ">
                <FaMusic size={50} className="mb-4" />
                <p className="lg:text-2xl font-bold mb-2">No song selected</p>
                <p className="lg:text-lg">
                  Please select a song <br /> to start playing music
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForYou;
