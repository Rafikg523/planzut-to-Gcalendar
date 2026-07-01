import type { PlanZutLesson } from "../types/planZutLessons.type.js";

export async function getStudentPlanFromPlanZut(
    studentNumber: string,
    startDate: string,
    endDate: string
): Promise<PlanZutLesson[]> {
    const url = new URL("https://plan.zut.edu.pl/schedule_student.php")
    url.searchParams.append("number", studentNumber);
    url.searchParams.append("start", startDate);
    url.searchParams.append("end", endDate);

    console.log("URL: ", url.toString());

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch lessons: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!Array.isArray(data)) {
        throw new Error("Fetched data is not an array");
    }

    return data.slice(1) as PlanZutLesson[];
}