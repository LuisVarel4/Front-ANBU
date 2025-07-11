import Welcome from "../features/Welcome";
import Traitors from "../features/Traitors";
import CustomBr from "../components/CustomBr";
import background from "../assets/ilustrations/bg-dashboard.webp";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <>
      <Welcome background={background} />
      <CustomBr />
      <Traitors />
      <CustomBr />
    </>
  );
};

export default HomePage;
