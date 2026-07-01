import "dotenv/config";

export const config = {
    databaseUrl: process.env.DATABASE_URL || "",
    studentNumber: process.env.STUDENT_NUMBER || "",
    googleCalendarId: process.env.GOOGLE_CALENDAR_ID || "",
    timezone: process.env.TIMEZONE || "",
    endDate: process.env.END_DATE || ""
}