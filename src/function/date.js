/**
 * @returns {string} 현재 시간을
 *          "(오전/오후) 시 : 분 : 초" 로 반환
 */
export function getFullTime() {
  const now = new Date();
  const int_hour = now.getHours();
  const int_minute = now.getMinutes();
  const int_second = now.getSeconds();
  const isAfternoon = int_hour >= 12 ? true : false;
  const hour =
    int_hour === 0 ? "12" : (int_hour % 12).toString().padStart(2, "0");
  const minute = int_minute.toString().padStart(2, "0");
  const second = int_second.toString().padStart(2, "0");
  if (isAfternoon) {
    return `오후 ${hour}:${minute}:${second}`;
  } else {
    return `오전 ${hour}:${minute}:${second}`;
  }
}
