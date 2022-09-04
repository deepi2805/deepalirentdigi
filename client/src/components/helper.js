import moment from "moment";

const momentDate = function (date, format) {
  return moment(date).format(format);
};

const trimeString = function (string, len) {
  return string.substr(string.length - len);
};

export { momentDate, trimeString };
