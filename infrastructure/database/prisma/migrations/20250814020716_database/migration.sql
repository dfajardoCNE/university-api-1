/*
  Warnings:

  - You are about to drop the `application_document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification_recipient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student_section` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `study_plan_course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `status` on the `administrative_staff` table. All the data in the column will be lost.
  - You are about to drop the column `applicationDate` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `campusId` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `personId` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `assignment` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `assignment` table. All the data in the column will be lost.
  - You are about to drop the column `enrollmentDate` on the `enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `exam` table. All the data in the column will be lost.
  - You are about to drop the column `examDate` on the `exam` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `exam` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `exam` table. All the data in the column will be lost.
  - You are about to drop the column `concept` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `termId` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `concept` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `referenceNumber` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `termId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhotoPath` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `practice` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `practice` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `reason` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `reportedBy` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `resolvedAt` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `threadId` on the `report` table. All the data in the column will be lost.
  - You are about to drop the column `academicStatus` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `gpa` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `study_plan` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `submission` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `submission` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `teacher_rating` table. All the data in the column will be lost.
  - You are about to alter the column `rating` on the `teacher_rating` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to drop the column `lastLogin` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordExpires` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordToken` on the `user` table. All the data in the column will be lost.
  - Added the required column `type` to the `academic_calendar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionId` to the `academic_record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionId` to the `enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionId` to the `exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceId` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professorId` to the `report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `study_plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `study_plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `teacher_rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "application_document_applicationId_idx";

-- DropIndex
DROP INDEX "notification_recipient_userId_idx";

-- DropIndex
DROP INDEX "notification_recipient_notificationId_idx";

-- DropIndex
DROP INDEX "student_section_sectionId_idx";

-- DropIndex
DROP INDEX "student_section_studentId_idx";

-- DropIndex
DROP INDEX "study_plan_course_courseId_idx";

-- DropIndex
DROP INDEX "study_plan_course_studyPlanId_idx";

-- AlterTable
ALTER TABLE "post" ADD COLUMN "deletedAt" DATETIME;

-- AlterTable
ALTER TABLE "professor" ADD COLUMN "deletedAt" DATETIME;
ALTER TABLE "professor" ADD COLUMN "updatedAt" DATETIME;

-- AlterTable
ALTER TABLE "thread" ADD COLUMN "deletedAt" DATETIME;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "application_document";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "notification_recipient";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "student_section";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "study_plan_course";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "StudyPlanCourse" (
    "studyPlanId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "isOptional" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("studyPlanId", "courseId"),
    CONSTRAINT "StudyPlanCourse_studyPlanId_fkey" FOREIGN KEY ("studyPlanId") REFERENCES "study_plan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudyPlanCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_academic_calendar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);
INSERT INTO "new_academic_calendar" ("createdAt", "description", "endDate", "id", "startDate", "title", "updatedAt") SELECT "createdAt", "description", "endDate", "id", "startDate", "title", "updatedAt" FROM "academic_calendar";
DROP TABLE "academic_calendar";
ALTER TABLE "new_academic_calendar" RENAME TO "academic_calendar";
CREATE TABLE "new_academic_record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "termId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "grade" REAL,
    "status" TEXT NOT NULL DEFAULT 'en_curso',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "academic_record_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "academic_record_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "academic_record_termId_fkey" FOREIGN KEY ("termId") REFERENCES "term" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "academic_record_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "section" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_academic_record" ("courseId", "createdAt", "grade", "id", "studentId", "termId", "updatedAt") SELECT "courseId", "createdAt", "grade", "id", "studentId", "termId", "updatedAt" FROM "academic_record";
DROP TABLE "academic_record";
ALTER TABLE "new_academic_record" RENAME TO "academic_record";
CREATE INDEX "academic_record_studentId_idx" ON "academic_record"("studentId");
CREATE INDEX "academic_record_courseId_idx" ON "academic_record"("courseId");
CREATE INDEX "academic_record_termId_idx" ON "academic_record"("termId");
CREATE INDEX "academic_record_sectionId_idx" ON "academic_record"("sectionId");
CREATE UNIQUE INDEX "academic_record_studentId_sectionId_key" ON "academic_record"("studentId", "sectionId");
CREATE TABLE "new_administrative_staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "hireDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "administrative_staff_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "administrative_staff_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_administrative_staff" ("createdAt", "departmentId", "hireDate", "id", "personId", "position", "updatedAt") SELECT "createdAt", "departmentId", "hireDate", "id", "personId", "position", "updatedAt" FROM "administrative_staff";
DROP TABLE "administrative_staff";
ALTER TABLE "new_administrative_staff" RENAME TO "administrative_staff";
CREATE UNIQUE INDEX "administrative_staff_personId_key" ON "administrative_staff"("personId");
CREATE INDEX "administrative_staff_personId_idx" ON "administrative_staff"("personId");
CREATE INDEX "administrative_staff_departmentId_idx" ON "administrative_staff"("departmentId");
CREATE TABLE "new_application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "careerId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendiente',
    "documents" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "application_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "career" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_application" ("careerId", "createdAt", "id", "status") SELECT "careerId", "createdAt", "id", "status" FROM "application";
DROP TABLE "application";
ALTER TABLE "new_application" RENAME TO "application";
CREATE INDEX "application_userId_idx" ON "application"("userId");
CREATE INDEX "application_careerId_idx" ON "application"("careerId");
CREATE TABLE "new_assignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" DATETIME NOT NULL,
    "maxScore" REAL NOT NULL DEFAULT 100,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_assignment" ("courseId", "createdAt", "description", "dueDate", "id", "title") SELECT "courseId", "createdAt", "description", "dueDate", "id", "title" FROM "assignment";
DROP TABLE "assignment";
ALTER TABLE "new_assignment" RENAME TO "assignment";
CREATE INDEX "assignment_courseId_idx" ON "assignment"("courseId");
CREATE TABLE "new_enrollment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "termId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'matriculado',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "enrollment_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "section" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "enrollment_termId_fkey" FOREIGN KEY ("termId") REFERENCES "term" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_enrollment" ("createdAt", "id", "status", "studentId", "termId", "updatedAt") SELECT "createdAt", "id", "status", "studentId", "termId", "updatedAt" FROM "enrollment";
DROP TABLE "enrollment";
ALTER TABLE "new_enrollment" RENAME TO "enrollment";
CREATE INDEX "enrollment_studentId_idx" ON "enrollment"("studentId");
CREATE INDEX "enrollment_sectionId_idx" ON "enrollment"("sectionId");
CREATE INDEX "enrollment_termId_idx" ON "enrollment"("termId");
CREATE UNIQUE INDEX "enrollment_studentId_sectionId_termId_key" ON "enrollment"("studentId", "sectionId", "termId");
CREATE TABLE "new_exam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL,
    "maxScore" REAL NOT NULL DEFAULT 100,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "exam_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "exam_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "section" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_exam" ("courseId", "createdAt", "id", "title") SELECT "courseId", "createdAt", "id", "title" FROM "exam";
DROP TABLE "exam";
ALTER TABLE "new_exam" RENAME TO "exam";
CREATE INDEX "exam_courseId_idx" ON "exam"("courseId");
CREATE INDEX "exam_sectionId_idx" ON "exam"("sectionId");
CREATE TABLE "new_invoice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendiente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "invoice_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_invoice" ("amount", "createdAt", "dueDate", "id", "status", "studentId", "updatedAt") SELECT "amount", "createdAt", "dueDate", "id", "status", "studentId", "updatedAt" FROM "invoice";
DROP TABLE "invoice";
ALTER TABLE "new_invoice" RENAME TO "invoice";
CREATE INDEX "invoice_studentId_idx" ON "invoice"("studentId");
CREATE TABLE "new_notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_notification" ("createdAt", "id", "message", "title", "userId") SELECT "createdAt", "id", "message", "title", "userId" FROM "notification";
DROP TABLE "notification";
ALTER TABLE "new_notification" RENAME TO "notification";
CREATE INDEX "notification_userId_idx" ON "notification"("userId");
CREATE TABLE "new_payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "invoiceId" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "paymentDate" DATETIME NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_payment" ("amount", "createdAt", "id", "paymentDate", "paymentMethod", "updatedAt") SELECT "amount", "createdAt", "id", "paymentDate", "paymentMethod", "updatedAt" FROM "payment";
DROP TABLE "payment";
ALTER TABLE "new_payment" RENAME TO "payment";
CREATE INDEX "payment_invoiceId_idx" ON "payment"("invoiceId");
CREATE TABLE "new_person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);
INSERT INTO "new_person" ("createdAt", "email", "firstName", "id", "lastName") SELECT "createdAt", "email", "firstName", "id", "lastName" FROM "person";
DROP TABLE "person";
ALTER TABLE "new_person" RENAME TO "person";
CREATE UNIQUE INDEX "person_email_key" ON "person"("email");
CREATE TABLE "new_practice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" DATETIME NOT NULL,
    "maxScore" REAL NOT NULL DEFAULT 100,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "practice_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_practice" ("courseId", "createdAt", "description", "dueDate", "id", "title") SELECT "courseId", "createdAt", "description", "dueDate", "id", "title" FROM "practice";
DROP TABLE "practice";
ALTER TABLE "new_practice" RENAME TO "practice";
CREATE INDEX "practice_courseId_idx" ON "practice"("courseId");
CREATE TABLE "new_report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "report_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_report" ("createdAt", "id") SELECT "createdAt", "id" FROM "report";
DROP TABLE "report";
ALTER TABLE "new_report" RENAME TO "report";
CREATE INDEX "report_userId_idx" ON "report"("userId");
CREATE INDEX "report_professorId_idx" ON "report"("professorId");
CREATE TABLE "new_role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_role" ("description", "id", "name") SELECT "description", "id", "name" FROM "role";
DROP TABLE "role";
ALTER TABLE "new_role" RENAME TO "role";
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");
CREATE TABLE "new_section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseId" INTEGER NOT NULL,
    "termId" INTEGER NOT NULL,
    "sessionTimeId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "classroomId" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 30,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "section_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "section_termId_fkey" FOREIGN KEY ("termId") REFERENCES "term" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "section_sessionTimeId_fkey" FOREIGN KEY ("sessionTimeId") REFERENCES "session_time" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "section_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "section_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classroom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_section" ("classroomId", "courseId", "createdAt", "id", "professorId", "sessionTimeId", "termId") SELECT "classroomId", "courseId", "createdAt", "id", "professorId", "sessionTimeId", "termId" FROM "section";
DROP TABLE "section";
ALTER TABLE "new_section" RENAME TO "section";
CREATE INDEX "section_courseId_idx" ON "section"("courseId");
CREATE INDEX "section_termId_idx" ON "section"("termId");
CREATE INDEX "section_sessionTimeId_idx" ON "section"("sessionTimeId");
CREATE INDEX "section_professorId_idx" ON "section"("professorId");
CREATE INDEX "section_classroomId_idx" ON "section"("classroomId");
CREATE TABLE "new_student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personId" INTEGER NOT NULL,
    "careerId" INTEGER NOT NULL,
    "campusId" INTEGER NOT NULL,
    "enrollmentDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'activo',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "student_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "student_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "career" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "student_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "campus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_student" ("campusId", "careerId", "createdAt", "enrollmentDate", "id", "personId", "status", "updatedAt") SELECT "campusId", "careerId", "createdAt", "enrollmentDate", "id", "personId", "status", "updatedAt" FROM "student";
DROP TABLE "student";
ALTER TABLE "new_student" RENAME TO "student";
CREATE UNIQUE INDEX "student_personId_key" ON "student"("personId");
CREATE INDEX "student_personId_idx" ON "student"("personId");
CREATE INDEX "student_careerId_idx" ON "student"("careerId");
CREATE INDEX "student_campusId_idx" ON "student"("campusId");
CREATE TABLE "new_study_plan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "careerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "study_plan_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "study_plan_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "career" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_study_plan" ("careerId", "createdAt", "id", "name", "updatedAt") SELECT "careerId", "createdAt", "id", "name", "updatedAt" FROM "study_plan";
DROP TABLE "study_plan";
ALTER TABLE "new_study_plan" RENAME TO "study_plan";
CREATE INDEX "study_plan_studentId_idx" ON "study_plan"("studentId");
CREATE INDEX "study_plan_careerId_idx" ON "study_plan"("careerId");
CREATE TABLE "new_submission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "examId" INTEGER,
    "assignmentId" INTEGER,
    "practiceId" INTEGER,
    "content" TEXT,
    "score" REAL,
    "feedback" TEXT,
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "submission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "submission_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exam" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "submission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "assignment" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "submission_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "practice" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_submission" ("assignmentId", "examId", "feedback", "id", "practiceId", "studentId", "submittedAt") SELECT "assignmentId", "examId", "feedback", "id", "practiceId", "studentId", "submittedAt" FROM "submission";
DROP TABLE "submission";
ALTER TABLE "new_submission" RENAME TO "submission";
CREATE INDEX "submission_studentId_idx" ON "submission"("studentId");
CREATE INDEX "submission_examId_idx" ON "submission"("examId");
CREATE INDEX "submission_assignmentId_idx" ON "submission"("assignmentId");
CREATE INDEX "submission_practiceId_idx" ON "submission"("practiceId");
CREATE TABLE "new_teacher_rating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "teacher_rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "teacher_rating_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_teacher_rating" ("comment", "createdAt", "id", "professorId", "rating") SELECT "comment", "createdAt", "id", "professorId", "rating" FROM "teacher_rating";
DROP TABLE "teacher_rating";
ALTER TABLE "new_teacher_rating" RENAME TO "teacher_rating";
CREATE INDEX "teacher_rating_userId_idx" ON "teacher_rating"("userId");
CREATE INDEX "teacher_rating_professorId_idx" ON "teacher_rating"("professorId");
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "user_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user" ("createdAt", "id", "passwordHash", "personId", "roleId", "username") SELECT "createdAt", "id", "passwordHash", "personId", "roleId", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
CREATE UNIQUE INDEX "user_personId_key" ON "user"("personId");
CREATE INDEX "user_personId_idx" ON "user"("personId");
CREATE INDEX "user_roleId_idx" ON "user"("roleId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "StudyPlanCourse_studyPlanId_idx" ON "StudyPlanCourse"("studyPlanId");

-- CreateIndex
CREATE INDEX "StudyPlanCourse_courseId_idx" ON "StudyPlanCourse"("courseId");
