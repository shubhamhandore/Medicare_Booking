import DoctorCard from "./DoctorCard";
import { BASE_URL } from "./../../config";
import useFetchData from "./../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const DoctorList = () => {
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);

  return (
    <>
      {loading && <Loader />}
      {error && (
        <div>
          <Error message="Failed to load doctor data. Please try again later." />
        </div>
      )}
      {!loading && !error && doctors.length === 0 && (
        <div className="text-center mt-10 text-lg text-textColor">
          No doctors available at the moment. Please check back later.
        </div>
      )}
      {!loading && !error && doctors.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default DoctorList;
