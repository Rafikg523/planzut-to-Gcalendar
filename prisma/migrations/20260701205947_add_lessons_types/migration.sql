-- CreateTable
CREATE TABLE "attendedLessons" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "lesson_form_short" TEXT NOT NULL,

    CONSTRAINT "attendedLessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessonsAdjustments" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "lesson_form_short" TEXT NOT NULL,
    "original_start_time" TIMESTAMP(3) NOT NULL,
    "original_end_time" TIMESTAMP(3) NOT NULL,
    "adjusted_start_time" TIMESTAMP(3) NOT NULL,
    "adjusted_end_time" TIMESTAMP(3) NOT NULL,
    "day_of_week" INTEGER NOT NULL,

    CONSTRAINT "lessonsAdjustments_pkey" PRIMARY KEY ("id")
);
