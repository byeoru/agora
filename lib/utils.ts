export function formatToWon(price: number): string {
  return price.toLocaleString("ko-KR");
}

export function formatToTimeAgo(date: string): string {
  const daysInMs = 1000 * 60 * 60 * 24;
  const hoursInMs = 1000 * 60 * 60;
  const minutesInMs = 1000 * 60;
  const time = new Date(date).getTime();
  const now = new Date().getTime();

  let diff = time - now;
  const formatter = new Intl.RelativeTimeFormat("ko");

  if (diff < minutesInMs) {
    return formatter.format(Math.floor(diff / minutesInMs), "minutes");
  } else if (diff < hoursInMs) {
    return formatter.format(Math.floor(diff / hoursInMs), "hours");
  } else {
    return formatter.format(Math.floor(diff / daysInMs), "days");
  }
}
