import React from "react";
import { Link } from "react-router-dom";

export const Heading = () => {
  return (
    <div>
      <div className="flex items-center mt-24 mb-10">
        <div className="flex-grow text-left px-4 py-2 m-2">
          <h5 className="text-gray-900 font-bold text-xl">Lista pomieszczeń</h5>
        </div>
      </div>
    </div>
  );
};