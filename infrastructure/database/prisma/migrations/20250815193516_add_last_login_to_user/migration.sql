/*
  Warnings:

  - Added the required column `professorId` to the `assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examDate` to the `exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professorId` to the `exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `concept` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "submission" ADD COLUMN "grade" REAL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN "lastLogin" DATETIME;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_assignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" DATETIME NOT NULL,
    "weight" REAL NOT NULL,
    "maxScore" REAL NOT NULL DEFAULT 100,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "assignment_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_assignment" ("courseId", "createdAt", "deletedAt", "description", "dueDate", "id", "maxScore", "title", "updatedAt") SELECT "courseId", "createdAt", "deletedAt", "description", "dueDate", "id", "maxScore", "title", "updatedAt" FROM "assignment";
DROP TABLE "assignment";
ALTER TABLE "new_assignment" RENAME TO "assignment";
CREATE INDEX "assignment_courseId_idx" ON "assignment"("courseId");
CREATE INDEX "assignment_professorId_idx" ON "assignment"("professorId");
CREATE TABLE "new_enrollment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "termId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'matriculado',
    "enrollmentDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "enrollment_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "section" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "enrollment_termId_fkey" FOREIGN KEY ("termId") REFERENCES "term" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_enrollment" ("createdAt", "deletedAt", "id", "sectionId", "status", "studentId", "termId", "updatedAt") SELECT "createdAt", "deletedAt", "id", "sectionId", "status", "studentId", "termId", "updatedAt" FROM "enrollment";
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
    "professorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" DATETIME NOT NULL,
    "examDate" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    "maxScore" REAL NOT NULL DEFAULT 100,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "exam_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "exam_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "section" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "exam_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_exam" ("courseId", "createdAt", "date", "deletedAt", "duration", "id", "maxScore", "sectionId", "title", "updatedAt") SELECT "courseId", "createdAt", "date", "deletedAt", "duration", "id", "maxScore", "sectionId", "title", "updatedAt" FROM "exam";
DROP TABLE "exam";
ALTER TABLE "new_exam" RENAME TO "exam";
CREATE INDEX "exam_courseId_idx" ON "exam"("courseId");
CREATE INDEX "exam_sectionId_idx" ON "exam"("sectionId");
CREATE INDEX "exam_professorId_idx" ON "exam"("professorId");
CREATE TABLE "new_invoice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "concept" TEXT NOT NULL,
    "termId" INTEGER,
    "description" TEXT,
    "dueDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendiente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "invoice_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "invoice_termId_fkey" FOREIGN KEY ("termId") REFERENCES "term" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_invoice" ("amount", "createdAt", "deletedAt", "dueDate", "id", "status", "studentId", "updatedAt") SELECT "amount", "createdAt", "deletedAt", "dueDate", "id", "status", "studentId", "updatedAt" FROM "invoice";
DROP TABLE "invoice";
ALTER TABLE "new_invoice" RENAME TO "invoice";
CREATE INDEX "invoice_studentId_idx" ON "invoice"("studentId");
CREATE INDEX "invoice_termId_idx" ON "invoice"("termId");
CREATE TABLE "new_payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "invoiceId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "concept" TEXT NOT NULL,
    "paymentDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "termId" INTEGER,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_payment" ("amount", "concept", "createdAt", "deletedAt", "description", "id", "invoiceId", "paymentDate", "paymentMethod", "referenceNumber", "status", "studentId", "termId", "updatedAt") SELECT "amount", "concept", "createdAt", "deletedAt", "description", "id", "invoiceId", "paymentDate", "paymentMethod", "referenceNumber", "status", "studentId", "termId", "updatedAt" FROM "payment";
DROP TABLE "payment";
ALTER TABLE "new_payment" RENAME TO "payment";
CREATE INDEX "payment_invoiceId_idx" ON "payment"("invoiceId");
CREATE INDEX "payment_studentId_idx" ON "payment"("studentId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
