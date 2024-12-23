export const formateDate = (date, config) => {
  if (!date) {
    return "Invalid Date"; // Return a default message if the date is invalid or not provided
  }

  const defaultOptions = { day: "numeric", month: "short", year: "numeric" };
  const options = config || defaultOptions;

  const formattedDate = new Date(date);

  // Check if the date is valid
  if (isNaN(formattedDate)) {
    return "Invalid Date"; // Return a message if the date is invalid
  }

  return formattedDate.toLocaleDateString("en-US", options);
};
