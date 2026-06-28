-- AlterEnum
ALTER TYPE "ActivityType" ADD VALUE 'FINANCIAL_UPDATED';

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "closedAt" TIMESTAMP(3),
ADD COLUMN     "closedServiceValue" DECIMAL(10,2);

-- CreateTable
CREATE TABLE "LeadAddition" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeadAddition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMonthlyGoal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "monthDate" TIMESTAMP(3) NOT NULL,
    "revenueGoal" DECIMAL(10,2),
    "wonLeadsGoal" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMonthlyGoal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeadAddition_leadId_createdAt_idx" ON "LeadAddition"("leadId", "createdAt");

-- CreateIndex
CREATE INDEX "UserMonthlyGoal_monthDate_idx" ON "UserMonthlyGoal"("monthDate");

-- CreateIndex
CREATE UNIQUE INDEX "UserMonthlyGoal_userId_monthDate_key" ON "UserMonthlyGoal"("userId", "monthDate");

-- CreateIndex
CREATE INDEX "Lead_status_closedAt_idx" ON "Lead"("status", "closedAt");

-- CreateIndex
CREATE INDEX "Lead_closedAt_idx" ON "Lead"("closedAt");

-- AddForeignKey
ALTER TABLE "LeadAddition" ADD CONSTRAINT "LeadAddition_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMonthlyGoal" ADD CONSTRAINT "UserMonthlyGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
