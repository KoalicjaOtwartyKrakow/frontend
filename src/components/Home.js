import React from "react";
import { Heading } from "./Heading";
import { ApartmentList } from "./ApartmentList";

export const Home = () => {
  return (
    <React.Fragment>
      <div className="container mx-auto">
        <h3 className="text-center text-3xl mt-20 text-base leading-8 text-black font-bold tracking-wide uppercase">
          #KoalicjaOtwartyKraków
        </h3>
        <Heading />
        <ApartmentList />
      </div>
    </React.Fragment>
  );
};