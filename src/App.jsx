import { useState } from "react";
import ForYou from "./components/ForYou";
import Logo from "./components/Logo";
import displayColorAtom from "./atoms/colorAtom";
import { useRecoilValue } from "recoil";

function App() {
  const screeenColor = useRecoilValue(displayColorAtom);
  // lg-flex
  return (
    <div
      className="sm:flex md:flex-col lg:flex-row  w-screen fixed   "
      style={{
        backgroundColor: screeenColor,
      }}
    >
      <Logo />

      <ForYou />
    </div>
  );
}

export default App;
