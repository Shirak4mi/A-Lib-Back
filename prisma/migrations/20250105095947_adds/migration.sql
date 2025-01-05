-- CreateTable
CREATE TABLE "User" (
    "id" SMALLSERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "verified_email" BOOLEAN NOT NULL DEFAULT false,
    "username" VARCHAR(255) NOT NULL,
    "password_salt" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "birth_date" DATE NOT NULL,
    "phone_number" VARCHAR(100) NOT NULL,
    "address" TEXT NOT NULL,
    "document_id" VARCHAR(40) NOT NULL,
    "is_bookable" BOOLEAN NOT NULL DEFAULT false,
    "document_type_id" SMALLINT NOT NULL,
    "status_id" SMALLINT NOT NULL DEFAULT 1,
    "user_type_id" SMALLINT NOT NULL DEFAULT 1,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" VARCHAR(255) NOT NULL,
    "user_id" SMALLINT NOT NULL,
    "expires_at" INTEGER NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemporalTokens" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "hashed_token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "token_type" INTEGER NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TemporalTokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuthAccount" (
    "id" SERIAL NOT NULL,
    "provider_id" SMALLINT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "OAuthAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SMALLSERIAL NOT NULL,
    "date" DATE NOT NULL,
    "start_time" DATE NOT NULL,
    "end_time" DATE NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT false,
    "user_id" SMALLINT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SMALLSERIAL NOT NULL,
    "date" DATE NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,
    "user_id" SMALLINT NOT NULL,
    "bookable_id" SMALLINT NOT NULL,
    "service_id" SMALLINT NOT NULL,
    "status_id" SMALLINT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking_Status" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE,

    CONSTRAINT "Booking_Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SMALLSERIAL NOT NULL,
    "comment" TEXT,
    "rating" INTEGER NOT NULL,
    "user_id" SMALLINT NOT NULL,
    "from_user_id" SMALLINT NOT NULL,
    "to_user_id" SMALLINT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expertise" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "user_id" SMALLINT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE,

    CONSTRAINT "Expertise_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "User_status" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "User_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_type" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "User_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_document_id_key" ON "User"("document_id");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccount_provider_id_provider_account_id_key" ON "OAuthAccount"("provider_id", "provider_account_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "Document_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "User_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_type_id_fkey" FOREIGN KEY ("user_type_id") REFERENCES "User_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemporalTokens" ADD CONSTRAINT "TemporalTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemporalTokens" ADD CONSTRAINT "TemporalTokens_token_type_fkey" FOREIGN KEY ("token_type") REFERENCES "Token_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthAccount" ADD CONSTRAINT "OAuthAccount_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthAccount" ADD CONSTRAINT "OAuthAccount_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "Provider_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bookable_id_fkey" FOREIGN KEY ("bookable_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Booking_Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_to_user_id_fkey" FOREIGN KEY ("to_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expertise" ADD CONSTRAINT "Expertise_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
