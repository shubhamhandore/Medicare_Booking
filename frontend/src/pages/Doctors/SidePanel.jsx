import PropTypes from "prop-types";
import convertTime from "../../utils/convertTime";
import { BASE_URL, token } from "./../../config";
import { toast } from "react-toastify";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const bookingHandler = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "An error occurred. Please try again.");
      }
      if (data.session?.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          <span>&#8377;</span>
          {ticketPrice}
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>

        {timeSlots?.length > 0 ? (
          <ul className="mt-3">
            {timeSlots.map((slot, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {slot.day.charAt(0).toUpperCase() + slot.day.slice(1)}
                </p>
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {convertTime(slot.startingTime)} -{" "}
                  {convertTime(slot.endingTime)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[15px] leading-6 text-textColor mt-3">
            No time slots available.
          </p>
        )}
      </div>

      <button
        onClick={bookingHandler}
        className="btn px-2 w-full rounded-md"
        aria-label="Book an appointment"
      >
        Book Appointment
      </button>
    </div>
  );
};

// PropTypes Validation
SidePanel.propTypes = {
  doctorId: PropTypes.string.isRequired,
  ticketPrice: PropTypes.number.isRequired,
  timeSlots: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      startingTime: PropTypes.string.isRequired,
      endingTime: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SidePanel;
