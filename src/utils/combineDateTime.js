export const combineDateTime = (dateInput, timeString) => {
  // If the input is a Date object, extract the date part as a string
  const baseDate = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (isNaN(baseDate)) {
    throw new Error("Invalid date input");
  }

  // Extract the year, month, and day
  const year = baseDate.getFullYear();
  const month = String(baseDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(baseDate.getDate()).padStart(2, "0");

  // Combine the extracted date and time
  const combinedDateTimeString = `${year}-${month}-${day}T${timeString}:00`;

  // Create and return the final Date object
  return new Date(combinedDateTimeString);
};
