-- CreateEnum
CREATE TYPE "PositionType" AS ENUM ('PUT', 'CALL', 'FUTURE');

-- CreateTable
CREATE TABLE "Strategy" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Strategy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strategy_positions" (
    "id" TEXT NOT NULL,
    "strategyId" TEXT NOT NULL,
    "positionType" "PositionType" NOT NULL,
    "variables" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "strategy_positions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Strategy_userId_name_key" ON "Strategy"("userId", "name");

-- AddForeignKey
ALTER TABLE "Strategy" ADD CONSTRAINT "Strategy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategy_positions" ADD CONSTRAINT "strategy_positions_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
