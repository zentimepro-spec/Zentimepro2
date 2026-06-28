-- CreateEnum
CREATE TYPE "LeadPriority" AS ENUM ('BAIXA', 'MEDIA', 'ALTA', 'URGENTE');

-- AlterTable
ALTER TABLE "Lead"
ADD COLUMN "nextAction" TEXT,
ADD COLUMN "nextActionAt" TIMESTAMP(3),
ADD COLUMN "priority" "LeadPriority" NOT NULL DEFAULT 'MEDIA';

-- CreateIndex
CREATE INDEX "Lead_priority_createdAt_idx" ON "Lead"("priority", "createdAt");
