/*
  Warnings:

  - You are about to drop the `User_Status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_status_id_fkey";

-- DropTable
DROP TABLE "User_Status";

-- CreateTable
CREATE TABLE "User_status" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "User_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "User_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
