-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "isReposted" BOOLEAN,
ADD COLUMN     "original_post_id" TEXT,
ADD COLUMN     "original_post_type_fields_id" TEXT,
ADD COLUMN     "original_user_id" TEXT;
