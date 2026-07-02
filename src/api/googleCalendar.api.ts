import { authenticate } from "@google-cloud/local-auth";
import { calendar_v3, google } from "googleapis";
import path from "path";
import type { CreateEventInput } from "../types/googleCalendarEvents.type.ts";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

export async function getGoogleCalendarClient(): Promise<calendar_v3.Calendar> {
    const auth = await authenticate({
        keyfilePath: path.join(process.cwd(), "credentials.json"),
        scopes: SCOPES,
    });

    return google.calendar({
        version: "v3",
        auth: auth as any,
    });
}

export async function getCalendarByName(
    calendarName: string
): Promise<calendar_v3.Schema$CalendarListEntry | null> {
    const calendar = await getGoogleCalendarClient();

    const response = await calendar.calendarList.list({
        minAccessRole: "owner",
    });

    const calendars = response.data.items ?? [];

    return calendars.find((item) => item.summary === calendarName) ?? null;
}

export async function createCalendar(
    calendarName: string
): Promise<calendar_v3.Schema$Calendar> {
    const calendar = await getGoogleCalendarClient();

    const response = await calendar.calendars.insert({
        requestBody: {
            summary: calendarName,
            timeZone: "Europe/Warsaw",
        },
    });

    if (!response.data.id) {
        throw new Error("Nie udało się utworzyć kalendarza");
    }

    return response.data;
}

export async function getOrCreateCalendar(
    calendarName: string
): Promise<string> {
    const existingCalendar = await getCalendarByName(calendarName);

    if (existingCalendar?.id) {
        return existingCalendar.id;
    }

    const createdCalendar = await createCalendar(calendarName);

    if (!createdCalendar.id) {
        throw new Error("Utworzony kalendarz nie ma ID");
    }

    return createdCalendar.id;
}

export async function getEventsInRange(
    calendarId: string,
    startDateTime: string,
    endDateTime: string
): Promise<calendar_v3.Schema$Event[]> {
    const calendar = await getGoogleCalendarClient();

    const response = await calendar.events.list({
        calendarId,
        timeMin: startDateTime,
        timeMax: endDateTime,
        singleEvents: true,
        orderBy: "startTime",
    });

    return response.data.items ?? [];
}

export async function addEvent(
    calendarId: string,
    event: CreateEventInput
): Promise<calendar_v3.Schema$Event> {
    const calendar = await getGoogleCalendarClient();

    const requestBody: calendar_v3.Schema$Event = {
        summary: event.summary,
        start: {
            dateTime: event.startDateTime,
            timeZone: event.timeZone ?? "Europe/Warsaw",
        },
        end: {
            dateTime: event.endDateTime,
            timeZone: event.timeZone ?? "Europe/Warsaw",
        },
    };

    if (event.description !== undefined) {
        requestBody.description = event.description;
    }

    if (event.location !== undefined) {
        requestBody.location = event.location;
    }

    if (event.colorId !== undefined) {
        requestBody.colorId = event.colorId;
    }

    const response = await calendar.events.insert({
        calendarId,
        requestBody,
    });

    if (!response.data.id) {
        throw new Error("Nie udało się dodać wydarzenia");
    }

    return response.data;
}

export async function deleteEvent(
    calendarId: string,
    eventId: string
): Promise<void> {
    const calendar = await getGoogleCalendarClient();

    await calendar.events.delete({
        calendarId,
        eventId,
    });
}