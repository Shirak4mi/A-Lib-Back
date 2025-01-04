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
    "document_type_id" SMALLINT NOT NULL,
    "status_id" SMALLINT NOT NULL DEFAULT 1,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barber" (
    "id" SMALLSERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "address" TEXT NOT NULL,
    "document_id" VARCHAR(40) NOT NULL,
    "document_type_id" SMALLINT NOT NULL,
    "status_id" SMALLINT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "Barber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Status" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "User_Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Session" (
    "id" VARCHAR(255) NOT NULL,
    "user_id" SMALLINT NOT NULL,
    "expires_at" INTEGER NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barber_Session" (
    "id" VARCHAR(255) NOT NULL,
    "barber_id" SMALLINT NOT NULL,
    "expires_at" INTEGER NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Barber_Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Otps" (
    "id" VARCHAR(255) NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "user_id" SMALLINT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_Otps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barber_Otps" (
    "id" VARCHAR(255) NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "barber_id" SMALLINT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Barber_Otps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document_Type" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "Document_Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SMALLSERIAL NOT NULL,
    "date" DATE NOT NULL,
    "start_time" DATE NOT NULL,
    "end_time" DATE NOT NULL,
    "barber_id" SMALLINT NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SMALLSERIAL NOT NULL,
    "date" DATE NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,
    "user_id" SMALLINT NOT NULL,
    "service_id" SMALLINT NOT NULL,
    "barber_id" SMALLINT NOT NULL,
    "status_id" SMALLINT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking_Status" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "Booking_Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SMALLSERIAL NOT NULL,
    "comment" TEXT,
    "rating" INTEGER NOT NULL,
    "user_id" SMALLINT NOT NULL,
    "barber_id" SMALLINT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expertise" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "barber_id" SMALLINT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "Expertise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_document_id_key" ON "User"("document_id");

-- CreateIndex
CREATE UNIQUE INDEX "Barber_email_key" ON "Barber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Barber_document_id_key" ON "Barber"("document_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "Document_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "User_Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barber" ADD CONSTRAINT "Barber_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "Document_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barber" ADD CONSTRAINT "Barber_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "User_Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Session" ADD CONSTRAINT "User_Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barber_Session" ADD CONSTRAINT "Barber_Session_barber_id_fkey" FOREIGN KEY ("barber_id") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Otps" ADD CONSTRAINT "User_Otps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barber_Otps" ADD CONSTRAINT "Barber_Otps_barber_id_fkey" FOREIGN KEY ("barber_id") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_barber_id_fkey" FOREIGN KEY ("barber_id") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Booking_Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_barber_id_fkey" FOREIGN KEY ("barber_id") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_barber_id_fkey" FOREIGN KEY ("barber_id") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expertise" ADD CONSTRAINT "Expertise_barber_id_fkey" FOREIGN KEY ("barber_id") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
