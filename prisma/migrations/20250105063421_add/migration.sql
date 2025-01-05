/*
  Warnings:

  - You are about to drop the `Document_Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Provider_Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Token_Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActiveTempTokens" DROP CONSTRAINT "ActiveTempTokens_token_type_fkey";

-- DropForeignKey
ALTER TABLE "OAuthAccount" DROP CONSTRAINT "OAuthAccount_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_document_type_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_user_type_id_fkey";

-- DropTable
DROP TABLE "Document_Type";

-- DropTable
DROP TABLE "Provider_Type";

-- DropTable
DROP TABLE "Token_Type";

-- DropTable
DROP TABLE "User_Type";

-- CreateTable
CREATE TABLE "Token_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "Token_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "Provider_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document_type" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "Document_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_type" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "User_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "Document_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_type_id_fkey" FOREIGN KEY ("user_type_id") REFERENCES "User_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveTempTokens" ADD CONSTRAINT "ActiveTempTokens_token_type_fkey" FOREIGN KEY ("token_type") REFERENCES "Token_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthAccount" ADD CONSTRAINT "OAuthAccount_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "Provider_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
