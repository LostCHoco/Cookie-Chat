export const limitNumber = (value) => {
  if (value > 20) {
    value = 20;
  } else if (value < 2 || isNaN(value)) {
    value = 2;
  }
  return value;
};
