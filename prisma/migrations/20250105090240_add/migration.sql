-- DropIndex
DROP INDEX "TemporalTokens_hashed_token_key";

-- DropIndex
DROP INDEX "TemporalTokens_user_id_key";

-- AlterTable
ALTER TABLE "TemporalTokens" ALTER COLUMN "expires_at" SET DATA TYPE DATE;
