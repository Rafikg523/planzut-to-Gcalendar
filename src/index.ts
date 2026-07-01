import { getStudentPlan } from "./services/planZut.service.js";
import { config } from "./config/config.js";

const studentNumber = config.studentNumber;
const startDate = "08-06-2026";
const endDate = "09-06-2026";

const lessons = await getStudentPlan(studentNumber, startDate, endDate);

console.log(lessons);