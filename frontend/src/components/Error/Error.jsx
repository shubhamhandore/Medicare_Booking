/* eslint-disable react/prop-types */

function Error({ message }) {
  return (
    <div className="text-center text-red-500 font-semibold mt-5">
      <p>{message || "An error occurred. Please try again later."}</p>
    </div>
  );
}

export default Error;
