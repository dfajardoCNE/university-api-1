-- CreateTable
CREATE TABLE "student_section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "currentGrade" REAL,
    "finalGrade" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "student_section_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "student_section_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "section" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "student_section_studentId_idx" ON "student_section"("studentId");

-- CreateIndex
CREATE INDEX "student_section_sectionId_idx" ON "student_section"("sectionId");
