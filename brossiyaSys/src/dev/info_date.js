const { v4: uuidv4 } = require("uuid");

// External function to generate a unique ID
function generateUniqueId() {
  // Generate a random 8-character alphanumeric string
  return Math.random().toString(36).substring(2, 10);
}

// External function to get the current month and year
function getCurrentMonthYear() {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Adding 1 because month index starts from 0
  const year = currentDate.getFullYear();
  return `${month}${year}`;
}

function getDate() {
  const currentDate = new Date();

  return currentDate;
}

module.exports = {
  getDate,
  getCurrentMonthYear,
  generateUniqueId,
};
