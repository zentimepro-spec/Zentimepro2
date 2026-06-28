-- AlterTable
ALTER TABLE "User"
ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "lastLoginAt" TIMESTAMP(3),
ADD COLUMN "passwordHash" TEXT NOT NULL DEFAULT '';

-- RemoveDefault
ALTER TABLE "User" ALTER COLUMN "passwordHash" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Lead_servico_createdAt_idx" ON "Lead"("servico", "createdAt");
