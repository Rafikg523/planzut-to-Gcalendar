import { getStudentPlanFromPlanZut } from "../api/planZut.api.js";
import type { PlanZutLesson } from "../types/planZutLessons.type.js";
import { toPlanZutDateFormat } from "../services/times.service.js";

export async function getStudentPlan(
    number: string,
    startDate: string,
    endDate: string
): Promise<Map<string, Map<string, PlanZutLesson[]>>> {

    startDate = toPlanZutDateFormat(startDate);
    endDate = toPlanZutDateFormat(endDate);

    const lessons = await getStudentPlanFromPlanZut(number, startDate, endDate);
    const SubjectMap = new Map<string, Map<string, PlanZutLesson[]>>(); 

    for (const lesson of lessons) {
        const subject = lesson.subject;
        const date = lesson.start;

        let lessonsByDate = SubjectMap.get(subject); //mapa danych zajęć dla przedmiotu

        if (!lessonsByDate) { //jezeli pusta
            lessonsByDate = new Map<string, PlanZutLesson[]>(); //tworzymy nową 
            SubjectMap.set(subject, lessonsByDate); //wsadzamy pierwszy rekord do nadrzędnej mapy 
        }

        const lessonsAtDate = lessonsByDate.get(date) ?? [];

        lessonsAtDate.push(lesson);
        lessonsByDate.set(date, lessonsAtDate);
    }
    return SubjectMap;
}