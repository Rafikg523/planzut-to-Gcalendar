import type { PlanZutLesson } from "../types/planZutLessons.type.js";
import { getStudentPlan } from "../services/planZut.service.js";
import { DateTime } from "luxon";
import { config } from "../config/config.js";

function SyncCalendarWithPlanZut() {
    //const zutLessonsMap = getStudentPlan("55764", DateTime.now().toFormat("dd-MM-yyyy"), "09-06-2026");
    const zutLessonsMap = getStudentPlan("55764", "08-06-2026", config.endDate);
    
}