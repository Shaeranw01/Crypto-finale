function formatDate(coinDate: string) {
  const newDate = new Date(coinDate).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return newDate;
}

export default formatDate;
