/*
  Warnings:

  - Added the required column `studentId` to the `teacher_rating` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_teacher_rating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "teacher_rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "teacher_rating_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "teacher_rating_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_teacher_rating" ("comment", "createdAt", "deletedAt", "id", "professorId", "rating", "updatedAt", "userId") SELECT "comment", "createdAt", "deletedAt", "id", "professorId", "rating", "updatedAt", "userId" FROM "teacher_rating";
DROP TABLE "teacher_rating";
ALTER TABLE "new_teacher_rating" RENAME TO "teacher_rating";
CREATE INDEX "teacher_rating_userId_idx" ON "teacher_rating"("userId");
CREATE INDEX "teacher_rating_professorId_idx" ON "teacher_rating"("professorId");
CREATE INDEX "teacher_rating_studentId_idx" ON "teacher_rating"("studentId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
