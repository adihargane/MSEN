const { DateTime } = require("luxon");

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to the month because it is zero-based
  const day = now.getDate().toString().padStart(2, "0");

  const date = `${year}${month}${day}`;
  return date;
}

function getLocalTime() {
  const IST = "Asia/Kolkata";
  const dateTimeIST = DateTime.now().setZone(IST);
  const formattedTime = dateTimeIST.toFormat("hhmmss");
  return formattedTime;
}

module.exports = {
  getToday,
  getLocalTime,
};
