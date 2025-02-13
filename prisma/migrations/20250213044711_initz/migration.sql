-- CreateTable
CREATE TABLE "User" (
    "id" SMALLSERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "verified_email" BOOLEAN NOT NULL DEFAULT false,
    "password_salt" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "document_id" VARCHAR(40) NOT NULL,
    "document_type_id" SMALLINT NOT NULL,
    "status_id" SMALLINT NOT NULL DEFAULT 1,
    "user_type_id" SMALLINT NOT NULL DEFAULT 1,
    "speaker_id" SMALLINT,
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
    "hashed_token" VARCHAR(80) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "token_type" INTEGER NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TemporalTokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "year" DATE NOT NULL,
    "copies" SMALLINT NOT NULL,
    "isbn" VARCHAR(30) NOT NULL,
    "description" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "book_status_id" SMALLINT NOT NULL,
    "editorial_id" INTEGER NOT NULL,
    "languague_id" SMALLINT NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EBooks" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "year" DATE NOT NULL,
    "description" TEXT NOT NULL,
    "total_downloads" INTEGER NOT NULL,
    "file_src" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "editorial_id" INTEGER NOT NULL,
    "languague_id" SMALLINT NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "EBooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book_genres" (
    "book_id" INTEGER NOT NULL,
    "genre_id" SMALLINT NOT NULL,

    CONSTRAINT "Book_genres_pkey" PRIMARY KEY ("book_id","genre_id")
);

-- CreateTable
CREATE TABLE "EBook_genres" (
    "ebook_id" INTEGER NOT NULL,
    "genre_id" SMALLINT NOT NULL,

    CONSTRAINT "EBook_genres_pkey" PRIMARY KEY ("ebook_id","genre_id")
);

-- CreateTable
CREATE TABLE "Authors" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "Authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book_Reservations" (
    "id" SERIAL NOT NULL,
    "from" DATE NOT NULL,
    "return_date" DATE NOT NULL,
    "book_id" INTEGER NOT NULL,
    "user_id" SMALLINT NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "Book_Reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Editorials" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "Editorials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Languagues" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "Languagues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trainings" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "speaker_id" INTEGER NOT NULL,
    "study_room_id" INTEGER NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "Trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speakers" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "Speakers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Study_room" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "max_personel_per_room" INTEGER NOT NULL DEFAULT 1,
    "status_id" SMALLINT NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "Study_room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room_reservations" (
    "id" SERIAL NOT NULL,
    "personal" SMALLINT NOT NULL,
    "motive" TEXT NOT NULL,
    "reservation_date" DATE NOT NULL,
    "start_hours" TIME NOT NULL,
    "end_hours" TIME NOT NULL,
    "room_id" SMALLINT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "Room_reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speakers_training" (
    "speaker_id" INTEGER NOT NULL,
    "training_id" SMALLINT NOT NULL,

    CONSTRAINT "Speakers_training_pkey" PRIMARY KEY ("speaker_id","training_id")
);

-- CreateTable
CREATE TABLE "Training_audience" (
    "training_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Training_audience_pkey" PRIMARY KEY ("training_id","user_id")
);

-- CreateTable
CREATE TABLE "Token_type" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "create_time" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" DATE NOT NULL,

    CONSTRAINT "Token_type_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Book_status" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "Book_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Study_room_status" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "Study_room_status_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "User_document_id_key" ON "User"("document_id");

-- CreateIndex
CREATE UNIQUE INDEX "Books_isbn_key" ON "Books"("isbn");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "Document_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "User_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_type_id_fkey" FOREIGN KEY ("user_type_id") REFERENCES "User_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_speaker_id_fkey" FOREIGN KEY ("speaker_id") REFERENCES "Speakers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemporalTokens" ADD CONSTRAINT "TemporalTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemporalTokens" ADD CONSTRAINT "TemporalTokens_token_type_fkey" FOREIGN KEY ("token_type") REFERENCES "Token_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_book_status_id_fkey" FOREIGN KEY ("book_status_id") REFERENCES "Book_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_languague_id_fkey" FOREIGN KEY ("languague_id") REFERENCES "Languagues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_editorial_id_fkey" FOREIGN KEY ("editorial_id") REFERENCES "Editorials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EBooks" ADD CONSTRAINT "EBooks_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EBooks" ADD CONSTRAINT "EBooks_languague_id_fkey" FOREIGN KEY ("languague_id") REFERENCES "Languagues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EBooks" ADD CONSTRAINT "EBooks_editorial_id_fkey" FOREIGN KEY ("editorial_id") REFERENCES "Editorials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book_genres" ADD CONSTRAINT "Book_genres_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book_genres" ADD CONSTRAINT "Book_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EBook_genres" ADD CONSTRAINT "EBook_genres_ebook_id_fkey" FOREIGN KEY ("ebook_id") REFERENCES "EBooks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EBook_genres" ADD CONSTRAINT "EBook_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book_Reservations" ADD CONSTRAINT "Book_Reservations_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book_Reservations" ADD CONSTRAINT "Book_Reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trainings" ADD CONSTRAINT "Trainings_study_room_id_fkey" FOREIGN KEY ("study_room_id") REFERENCES "Study_room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Study_room" ADD CONSTRAINT "Study_room_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Study_room_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room_reservations" ADD CONSTRAINT "Room_reservations_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Study_room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room_reservations" ADD CONSTRAINT "Room_reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Speakers_training" ADD CONSTRAINT "Speakers_training_speaker_id_fkey" FOREIGN KEY ("speaker_id") REFERENCES "Speakers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Speakers_training" ADD CONSTRAINT "Speakers_training_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "Trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training_audience" ADD CONSTRAINT "Training_audience_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training_audience" ADD CONSTRAINT "Training_audience_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "Trainings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
