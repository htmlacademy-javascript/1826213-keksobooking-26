const getRandomNumber = (min, max) => {
  if(min >= 0 && max >= 0 && min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return NaN;
  }
};

getRandomNumber();

const getRandomNumberWithPoint = (min, max, fraction) => {
  if(min >= 0 && max >= 0 && min < max && fraction >= 0 && Number.isInteger(fraction)) {
    return ((Math.random() * (max - min + 1)) + min).toFixed(fraction);
  } else {
    return NaN;
  }
};

getRandomNumberWithPoint();

// Об использованных методах я узнал на MDN
