export enum GoogleCalendarEventColor {
    Lavender = "1",
    Sage = "2",
    Grape = "3",
    Flamingo = "4",
    Banana = "5",
    Tangerine = "6",
    Peacock = "7",
    Graphite = "8",
    Blueberry = "9",
    Basil = "10",
    Tomato = "11",
}

export type CreateEventInput = {
    summary: string;
    description?: string;
    location?: string;
    startDateTime: string;
    endDateTime: string;
    timeZone?: string;
    colorId?: GoogleCalendarEventColor;
};