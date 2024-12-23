/* eslint-disable no-unused-vars */
import React from "react";
import { services } from "./../../assets/data/services";
import ServiceCard from "./ServiceCard";

const ServiceList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {services.map((item) => (
        <ServiceCard
          item={item}
          index={item.id} // Use unique id if available in data
          key={item.id} // Unique key for each card
        />
      ))}
    </div>
  );
};

export default ServiceList;
