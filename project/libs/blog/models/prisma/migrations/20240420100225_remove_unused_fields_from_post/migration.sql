/*
  Warnings:

  - You are about to drop the column `content` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `posts` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "posts_title_idx";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "content",
DROP COLUMN "description",
DROP COLUMN "title";

-- CreateIndex
CREATE INDEX "posts_id_idx" ON "posts"("id");
