export const units = [
  "szt.",
  "g",
  "kg",
  "ml",
  "l",
  "łyżeczka",
  "łyżka",
  "szklanka",
];

export const unitConversion = (value, inputUnit, outputUnit) => {
  switch (inputUnit) {
    case "g":
      return gramsConversion(value, outputUnit);
    case "kg":
      return kgConversion(value, outputUnit);
    case "ml":
      return mlConversion(value, outputUnit);
    case "l":
      return lConversion(value, outputUnit);
    case "łyżeczka":
      return teaSpoonConversion(value, outputUnit);
    case "łyżka":
      return tableSpoonConversion(value, outputUnit);
    case "szklanka":
      return glassConversion(value, outputUnit);

    default:
      return value;
  }
};

const gramsConversion = (value, outputUnit) => {
  switch (outputUnit) {
    case "kg":
      return value * 0.001;
    case "l":
      return value * 0.001;
    case "łyżeczka":
      return value * 0.2;
    case "łyżka":
      return +((value * (2 / 3)) / 10).toFixed(2);
    case "szklanka":
      return value * 0.004;

    default:
      return value;
  }
};

const kgConversion = (value, outputUnit) => {
  switch (outputUnit) {
    case "g":
      return value * 1000;
    case "ml":
      return value * 1000;
    case "łyżeczka":
      return value * 200;
    case "łyżka":
      return +(value * (2 / 3) * 100).toFixed(2);
    case "szklanka":
      return value * 4;

    default:
      return value;
  }
};

const mlConversion = (value, outputUnit) => {
  switch (outputUnit) {
    case "kg":
      return value * 0.001;
    case "l":
      return value * 0.001;
    case "łyżeczka":
      return value * 0.2;
    case "łyżka":
      return +((value * (2 / 3)) / 10).toFixed(2);
    case "szklanka":
      return value * 0.004;

    default:
      return value;
  }
};

const lConversion = (value, outputUnit) => {
  switch (outputUnit) {
    case "ml":
      return value * 1000;
    case "g":
      return value * 1000;
    case "łyżeczka":
      return value * 200;
    case "łyżka":
      return +(value * (2 / 3) * 100).toFixed(2);
    case "szklanka":
      return value * 4;

    default:
      return value;
  }
};

const teaSpoonConversion = (value, outputUnit) => {
  switch (outputUnit) {
    case "kg":
      return value * 0.005;
    case "l":
      return value * 0.005;
    case "g":
      return value * 5;
    case "ml":
      return value * 5;
    case "łyżka":
      return +(value * (1 / 3)).toFixed(2);
    case "szklanka":
      return value / 50;

    default:
      return value;
  }
};

const tableSpoonConversion = (value, outputUnit) => {
  switch (outputUnit) {
    case "kg":
      return value * 0.015;
    case "l":
      return value * 0.015;
    case "g":
      return value * 15;
    case "ml":
      return value * 15;
    case "łyżeczka":
      return value * 3;
    case "szklanka":
      return +(value / 16.67).toFixed(2);

    default:
      return value;
  }
};

const glassConversion = (value, outputUnit) => {
  switch (outputUnit) {
    case "kg":
      return value * 0.25;
    case "l":
      return value * 0.25;
    case "g":
      return value * 250;
    case "ml":
      return value * 250;
    case "łyżeczka":
      return value * 50;
    case "łyżka":
      return +(value * 16.67).toFixed(2);

    default:
      return value;
  }
};
