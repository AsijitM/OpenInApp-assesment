function getPriority(due_date) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const dayDifference = Math.floor((due_date - today) / (1000 * 60 * 60 * 24));

  // Apply priority rules based on day difference
  if (dayDifference === 0) {
    return 0;
  } else if (dayDifference >= 1 && dayDifference <= 2) {
    return 1;
  } else if (dayDifference >= 3 && dayDifference <= 4) {
    return 2;
  } else if (dayDifference >= 5) {
    return 3;
  }
}
module.exports = getPriority;
