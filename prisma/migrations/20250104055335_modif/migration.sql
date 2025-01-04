/*
  Warnings:

  - Added the required column `birth_date` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_salt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birth_date" DATE NOT NULL,
ADD COLUMN     "password_salt" VARCHAR(255) NOT NULL;
