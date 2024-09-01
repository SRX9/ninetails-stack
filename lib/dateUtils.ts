export const greetMessage = () => {
  const now = new Date();

  const hour = now.getHours();

  if (hour > 0 && hour < 4) {
    return "Happy Late Night";
  } else if (hour < 6) {
    return "Happy Early Morning";
  } else if (hour < 12) {
    return "Good Morning";
  } else if (hour < 20) {
    return "Good Afternoon";
  } else if (hour <= 23) {
    return "Good Night";
  } else {
    return "Good Evening";
  }
};

export function formatDateTimeToFull(dateTime: any) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return dateTime.toLocaleString("en-US", options);
}
