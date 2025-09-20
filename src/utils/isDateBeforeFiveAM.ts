import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function isDateBeforeFiveAM(mongoDate: string | Date): boolean {
  const docDate = dayjs(mongoDate).tz("America/Bogota");

  const todayAt5 = dayjs()
    .tz("America/Bogota")
    .hour(5)
    .minute(0)
    .second(0)
    .millisecond(0);

  return docDate.isBefore(todayAt5);
}
