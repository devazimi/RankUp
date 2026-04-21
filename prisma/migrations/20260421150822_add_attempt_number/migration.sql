-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TestResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "answers" TEXT NOT NULL,
    "attemptNumber" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TestResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TestResult" ("answers", "createdAt", "id", "score", "testId", "totalQuestions", "updatedAt", "userId") SELECT "answers", "createdAt", "id", "score", "testId", "totalQuestions", "updatedAt", "userId" FROM "TestResult";
DROP TABLE "TestResult";
ALTER TABLE "new_TestResult" RENAME TO "TestResult";
CREATE INDEX "TestResult_userId_testId_idx" ON "TestResult"("userId", "testId");
CREATE UNIQUE INDEX "TestResult_userId_testId_attemptNumber_key" ON "TestResult"("userId", "testId", "attemptNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
