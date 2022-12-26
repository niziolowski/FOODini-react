export const calcDaysToExpiry = (purchaseDate, expiryTime) => {
  const now = new Date();
  const expiryDate = addDaysToDate(purchaseDate, expiryTime);

  //   calculate the difference and convert to number of days
  const output = (expiryDate - now) / (1000 * 3600 * 24);
  return output < 0 ? 0 : Math.ceil(output);
};

export const addDaysToDate = (date, days) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

/**
 *
 * @param {Date} date
 * @returns Date formated for input type="date"
 */
export function formatDate(date) {
  let year = date.getFullYear();
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
