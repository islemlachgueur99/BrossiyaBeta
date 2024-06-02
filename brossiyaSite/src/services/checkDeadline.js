export default function checkDeadline(dateString) {
  // Parse the input date string to create a Date object
  const inputDate = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds between the current date and the input date
  const timeDifference = currentDate.getTime() - inputDate.getTime();

  // Calculate the difference in days
  const differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Check if the difference is greater than 20 days
  if (differenceInDays > 20) {
    return "Hors délai";
  } else {
    // Calculate the number of days remaining until the deadline (negative if past deadline)
    const remainingDays = 20 - differenceInDays;
    return remainingDays + " jours restants";
  }
}
