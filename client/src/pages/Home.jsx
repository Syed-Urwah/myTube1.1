import React from "react";
import Navbar from "../components/Navbar";
import Vidoes from "../components/Vidoes";

export default function Home() {
  return (
    // <div>
    //   <main id="main" className="flex">
    //     <Navbar display="block"/>
    //     <Vidoes type="random" />
    //   </main>
    // </div>
    <Vidoes type="random" />
  );
}
