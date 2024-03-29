export function formatToWon(price: number): string {
  return price.toLocaleString("ko-KR");
}

export function formatToTimeAgo(date: Date): string {
  const minsInMs = 1000 * 60;
  const hoursInMs = minsInMs * 60;
  const daysInMs = hoursInMs * 24;

  const ms = new Date(date).getTime();
  const nowMs = Date.now();

  const formatter = new Intl.RelativeTimeFormat("ko");

  let diff = ms - nowMs;

  if (-diff < minsInMs) {
    return "방금 전";
  } else if (-diff < hoursInMs) {
    diff = Math.round(diff / minsInMs);
    return formatter.format(diff, "minutes");
  } else if (-diff < daysInMs) {
    diff = Math.round(diff / hoursInMs);
    return formatter.format(diff, "hours");
  } else {
    // TODO: 윤년 적용해서 정확하게 다시 수정하기
    diff = Math.round(diff / daysInMs);
    return formatter.format(diff, "days");
  }
}

export function formatToLocalDate(date: Date): string {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}
