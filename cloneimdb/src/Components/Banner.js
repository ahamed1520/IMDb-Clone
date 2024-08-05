import React from "react";

const Banner = () => {
  return (
    <div
      className="h-[20vh] md:h-[85vh] bg-no-repeat bg-center flex items-end bg-cover"
      style={{
        backgroundImage: `url(https://assets-in.bmscdn.com/discovery-catalog/events/et00311714-ewdhvajezf-landscape.jpg)`,
      }}
    >
      <div className="text-xl md:text-3xl bg-gray-900 bg-cover bg-opacity-60 p-4 w-[100%] text-center text-white font-bold">
        John wick
      </div>
    </div>
  );
};

export default Banner;
