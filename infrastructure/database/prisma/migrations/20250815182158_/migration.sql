/*
  Warnings:

  - Added the required column `campusId` to the `application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personId` to the `application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN "resetPasswordExpires" DATETIME;
ALTER TABLE "user" ADD COLUMN "resetPasswordToken" TEXT;

-- CreateTable
CREATE TABLE "notification_recipient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "notificationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "notification_recipient_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "notification" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "notification_recipient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "application_document" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "applicationId" INTEGER NOT NULL,
    "documentType" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "uploadDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "application_document_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "application" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,
    "careerId" INTEGER NOT NULL,
    "campusId" INTEGER NOT NULL,
    "applicationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pendiente',
    "documents" TEXT,
    "comments" TEXT,
    "reviewedBy" INTEGER,
    "reviewedAt" DATETIME,
    "admissionResult" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "application_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "application_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "career" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "application_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "campus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_application" ("careerId", "createdAt", "deletedAt", "documents", "id", "status", "updatedAt", "userId") SELECT "careerId", "createdAt", "deletedAt", "documents", "id", "status", "updatedAt", "userId" FROM "application";
DROP TABLE "application";
ALTER TABLE "new_application" RENAME TO "application";
CREATE INDEX "application_userId_idx" ON "application"("userId");
CREATE INDEX "application_personId_idx" ON "application"("personId");
CREATE INDEX "application_careerId_idx" ON "application"("careerId");
CREATE INDEX "application_campusId_idx" ON "application"("campusId");
CREATE INDEX "application_reviewedBy_idx" ON "application"("reviewedBy");
CREATE TABLE "new_student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personId" INTEGER NOT NULL,
    "careerId" INTEGER NOT NULL,
    "campusId" INTEGER NOT NULL,
    "enrollmentDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'activo',
    "academicStatus" TEXT NOT NULL DEFAULT 'regular',
    "gpa" REAL NOT NULL DEFAULT 0.0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "student_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "student_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "career" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "student_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "campus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_student" ("campusId", "careerId", "createdAt", "deletedAt", "enrollmentDate", "id", "personId", "status", "updatedAt") SELECT "campusId", "careerId", "createdAt", "deletedAt", "enrollmentDate", "id", "personId", "status", "updatedAt" FROM "student";
DROP TABLE "student";
ALTER TABLE "new_student" RENAME TO "student";
CREATE UNIQUE INDEX "student_personId_key" ON "student"("personId");
CREATE INDEX "student_personId_idx" ON "student"("personId");
CREATE INDEX "student_careerId_idx" ON "student"("careerId");
CREATE INDEX "student_campusId_idx" ON "student"("campusId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "notification_recipient_notificationId_idx" ON "notification_recipient"("notificationId");

-- CreateIndex
CREATE INDEX "notification_recipient_userId_idx" ON "notification_recipient"("userId");

-- CreateIndex
CREATE INDEX "application_document_applicationId_idx" ON "application_document"("applicationId");
