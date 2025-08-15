/*
  Warnings:

  - Added the required column `concept` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceNumber` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professorId` to the `practice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `practice` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    CONSTRAINT "payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_payment" ("amount", "createdAt", "deletedAt", "id", "invoiceId", "paymentDate", "paymentMethod", "updatedAt") SELECT "amount", "createdAt", "deletedAt", "id", "invoiceId", "paymentDate", "paymentMethod", "updatedAt" FROM "payment";
DROP TABLE "payment";
ALTER TABLE "new_payment" RENAME TO "payment";
CREATE INDEX "payment_invoiceId_idx" ON "payment"("invoiceId");
CREATE TABLE "new_practice" (
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
    CONSTRAINT "practice_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "practice_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_practice" ("courseId", "createdAt", "deletedAt", "description", "dueDate", "id", "maxScore", "title", "updatedAt") SELECT "courseId", "createdAt", "deletedAt", "description", "dueDate", "id", "maxScore", "title", "updatedAt" FROM "practice";
DROP TABLE "practice";
ALTER TABLE "new_practice" RENAME TO "practice";
CREATE INDEX "practice_courseId_idx" ON "practice"("courseId");
CREATE INDEX "practice_professorId_idx" ON "practice"("professorId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
