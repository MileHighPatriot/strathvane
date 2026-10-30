const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function nextDays(count: number) {
  const start = new Date();
  start.setHours(12, 0, 0, 0);
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const wd = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const day = String(date.getDate());
    return {
      value: `${wd}, ${month} ${day}`,
      wd,
      day,
      month,
    };
  });
}

