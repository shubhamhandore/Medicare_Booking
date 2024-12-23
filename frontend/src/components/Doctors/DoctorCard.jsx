/* eslint-disable react/prop-types */
import React from "react";
import startIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import PropTypes from "prop-types"; // Import PropTypes for type checking

const DoctorCard = ({ doctor }) => {
  const { name, avgRating, totalRating, photo, specialization, experiences } =
    doctor;

  // Safely extract hospital information from experiences array
  const hospitalName =
    experiences && experiences.length > 0
      ? experiences[0]?.hospital
      : "Unknown Hospital";

  return (
    <div className="p-3 lg:p-5">
      <div>
        <img
          src={photo}
          className="w-full"
          alt={`Photo of Dr. ${name}`}
        />
      </div>

      <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-handlingColor font-[700] mt-3 lg:mt-5">
        {name}
      </h2>

      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
          {specialization}
        </span>

        <div className="flex items-center gap-[6px]">
          <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
            <img
              src={startIcon}
              alt="Rating star"
            />{" "}
            {avgRating}
          </span>
          <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
            ({totalRating})
          </span>
        </div>
      </div>

      <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
        <p className="text-[14px] leading-6 font-[400] text-textColor">
          At {hospitalName}
        </p>

        <Link
          to={`/doctors/${doctor._id}`}
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor"
        >
          <BsArrowRight className="group-hover:text-white w-6 h-5" />
        </Link>
      </div>
    </div>
  );
};

// Prop-Types for DoctorCard component
DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avgRating: PropTypes.number.isRequired,
    totalRating: PropTypes.number.isRequired,
    photo: PropTypes.string.isRequired,
    specialization: PropTypes.string.isRequired,
    experiences: PropTypes.arrayOf(
      PropTypes.shape({
        hospital: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default DoctorCard;
