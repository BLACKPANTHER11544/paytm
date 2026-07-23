-- CreateTable
CREATE TABLE "AccountBalance" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AccountBalance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountBalance_userId_key" ON "AccountBalance"("userId");

-- AddForeignKey
ALTER TABLE "AccountBalance" ADD CONSTRAINT "AccountBalance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
