import React from "react";
import Header from "../Components/Header";
import Welcome from "../Components/Welcome";
import Thumbnail from "../Components/Thumbnail";
import NavBar from "../Components/NavBar";

const Home = () => {
  return (
    <>
      <Header />
      <div className="p-5 flex flex-col gap-6">
        <Welcome />
        <Thumbnail />
        <img src="ayra-thumbnail.png" alt="" className="" />
      </div>
    </>
  );
};

export default Home;
