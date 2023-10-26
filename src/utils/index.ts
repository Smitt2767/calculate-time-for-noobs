const getSeconds = (time: string) => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 60 * 60 + minutes * 60 + seconds;
};

export const getDifferenceInSeconds = (startTime: string, endTime: string) =>
  getSeconds(endTime) - getSeconds(startTime);

const getHoursMinutesAndSeconds = (seconds: number) => {
  const h = Math.floor(seconds / 60 / 60);
  const m = Math.floor((seconds - h * 60 * 60) / 60);
  const s = seconds - h * 60 * 60 - m * 60;
  return { h, m, s };
};

export const getHoursMinutesSecondsText = (seconds: number) => {
  const { h, m, s } = getHoursMinutesAndSeconds(Math.abs(seconds));
  return `${Math.sign(seconds) === -1 ? "-" : ""}${h}h ${m}m ${s
    .toString()
    .padStart(2, "0")}s`;
};

export const getEndTime = (startTime: string, remainingSeconds: number = 0) => {
  try {
    const [startHour, startMinute, startSeconds] = startTime
      .split(":")
      .map(Number);
    const today = new Date();
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      startHour,
      startMinute,
      startSeconds + remainingSeconds
    );

    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }).format(date);
  } catch (err) {
    return "";
  }
};

type StorageKeys = "log_info";
export class Storage {
  static get<T>(key: StorageKeys) {
    return JSON.parse(localStorage.getItem(key) ?? "null") as T | null;
  }
  static set(key: StorageKeys, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static remove(key: StorageKeys) {
    localStorage.removeItem(key);
  }
}
