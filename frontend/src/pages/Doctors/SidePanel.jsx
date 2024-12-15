/* eslint-disable react/prop-types */

import convertTime from "../../utils/convertTime";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold"> Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          <span>&#8377;</span>
          {ticketPrice}
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>

        <ul className="mt-3">
          {timeSlots?.map((items, index) => (
            <li
              key={index}
              className="flex items-center justify-between mb-2"
            >
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {items.day.charAt(0).toUpperCase() + items.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(items.startingTime)} -
                {convertTime(items.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <button className="btn px-2 w-full rounded-md">Book Appointment</button>
    </div>
  );
};

export default SidePanel;
