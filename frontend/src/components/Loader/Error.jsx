/* eslint-disable react/prop-types */
const Error = ({ errMessage }) => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-red-100 border border-red-400 p-4 rounded-md">
      <h3 className="text-red-600 text-[20px] leading-[30px] font-semibold">
        {errMessage}
      </h3>
    </div>
  );
};

export default Error;
