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
