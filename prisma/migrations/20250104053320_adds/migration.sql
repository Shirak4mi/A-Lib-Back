/*
  Warnings:

  - You are about to drop the `Barber_Status` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[document_id]` on the table `Barber` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[document_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Barber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document_id` to the `Barber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document_type_id` to the `Barber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document_type_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Barber" DROP CONSTRAINT "Barber_status_id_fkey";

-- AlterTable
ALTER TABLE "Barber" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "document_id" VARCHAR(40) NOT NULL,
ADD COLUMN     "document_type_id" SMALLINT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "document_id" VARCHAR(40) NOT NULL,
ADD COLUMN     "document_type_id" SMALLINT NOT NULL;

-- DropTable
DROP TABLE "Barber_Status";

-- CreateTable
CREATE TABLE "Document_Type" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "Document_Type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Barber_document_id_key" ON "Barber"("document_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_document_id_key" ON "User"("document_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "Document_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barber" ADD CONSTRAINT "Barber_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "Document_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barber" ADD CONSTRAINT "Barber_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "User_Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
