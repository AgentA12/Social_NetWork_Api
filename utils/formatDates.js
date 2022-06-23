const date = require("date-and-time");

function formatDate(createdAtTime) {
  return new date.format(createdAtTime, "HH:mm:ss, ddd, MMM DD YYYY");
}

module.exports = formatDate;
