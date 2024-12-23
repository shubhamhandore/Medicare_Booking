import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from "./../../components/Doctors/DoctorCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Loader/Error";

const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointment`);

  // Loading state
  if (loading) return <Loading />;

  // Error state
  if (error) return <Error errMessage={error} />;

  // Empty state when no appointments are found
  if (!appointments.length) {
    return (
      <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
        You have not booked any doctor yet!
      </h2>
    );
  }

  // Normal state when appointments are available
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {appointments.map((doctor) => (
        <DoctorCard
          doctor={doctor}
          key={doctor._id}
        />
      ))}
    </div>
  );
};

export default MyBookings;
