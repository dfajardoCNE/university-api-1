/*
  Warnings:

  - Added the required column `reason` to the `report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportedBy` to the `report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `report` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "threadId" INTEGER,
    "postId" INTEGER,
    "reportedBy" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    "resolvedAt" DATETIME,
    CONSTRAINT "report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "report_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_report" ("content", "createdAt", "deletedAt", "id", "professorId", "title", "updatedAt", "userId") SELECT "content", "createdAt", "deletedAt", "id", "professorId", "title", "updatedAt", "userId" FROM "report";
DROP TABLE "report";
ALTER TABLE "new_report" RENAME TO "report";
CREATE INDEX "report_userId_idx" ON "report"("userId");
CREATE INDEX "report_professorId_idx" ON "report"("professorId");
CREATE INDEX "report_reportedBy_idx" ON "report"("reportedBy");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
