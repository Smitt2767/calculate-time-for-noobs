export const getDifferenceInMinutes = (
  startTime: string,
  endTime: string
): number => {
  try {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    return endHour * 60 + endMinute - (startHour * 60 + startMinute);
  } catch (err) {
    return 0;
  }
};

export const getHoursAndMinutes = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return { h, m };
};

export const getHoursMinutesText = (minutes: number) => {
  const { h, m } = getHoursAndMinutes(Math.abs(minutes));
  return `${Math.sign(minutes) === -1 ? "-" : ""}${h}h ${m
    .toString()
    .padStart(2, "0")}m`;
};

export const getEndTime = (startTime: string, remainingMinutes: number) => {
  try {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const today = new Date();
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      startHour,
      startMinute + remainingMinutes
    );

    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "numeric",
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
