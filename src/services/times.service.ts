import { DateTime } from "luxon";

export const toPlanZutDateFormat = (date: string): string => {
    const [day, month, year] = date.split("-").map(Number);
    const dateTime = DateTime.fromObject(
        {
            year,
            month,
            day,
            hour: 0,
            minute: 0,
            second: 0,
        },
        {
            zone: "Europe/Warsaw",
        }
    )

    return dateTime.toISO({suppressMilliseconds: true})!;
}