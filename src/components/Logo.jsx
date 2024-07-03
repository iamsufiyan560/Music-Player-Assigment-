import { FaSpotify } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import sidebarAtom from "../atoms/sidebarAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Logo = () => {
  const sideBar = useRecoilValue(sidebarAtom);
  const setSidebar = useSetRecoilState(sidebarAtom);

  return (
    // lg:h-screen
    <div className=" lg:relative lg:h-screen  z-50   ">
      <div className="flex flex-row  ">
        <div className="flex gap-4 text-2xl font-bold p-8 pr-16 mr-8 text-white">
          <FaSpotify
            size={40}
            className="shrink-0 rounded-sm bg-text-white/5 text-white"
          />
          SPOTIFY
        </div>
        <div className=" pt-8 cursor-pointer sm:block lg:hidden ">
          {sideBar && (
            <RxCross1
              onClick={() => setSidebar(false)}
              size={32}
              className="shrink-0  bg-[#FFFFFF1A] rounded-full p-2  bg-text-white/5 text-white"
            />
          )}
          {!sideBar && (
            <GiHamburgerMenu
              onClick={() => setSidebar(true)}
              size={32}
              className="shrink-0  bg-[#FFFFFF1A] rounded-full p-2  bg-text-white/5 text-white"
            />
          )}
        </div>
      </div>

      <div className="lg:block md:hidden sm:hidden  hidden ">
        <img
          src="/Profile.png"
          alt="profile pic"
          className="absolute bottom-0 p-8  "
        />
      </div>
    </div>
  );
};

export default Logo;
