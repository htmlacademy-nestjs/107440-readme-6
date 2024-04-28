/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `link_posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId]` on the table `quote_posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId]` on the table `text_posts` will be added. If there are existing duplicate values, this will fail.
  - Made the column `postId` on table `link_posts` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `postId` to the `quote_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `text_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "link_posts" ALTER COLUMN "postId" SET NOT NULL;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "likes" TEXT[];

-- AlterTable
ALTER TABLE "quote_posts" ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "text_posts" ADD COLUMN     "postId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "link_posts_postId_key" ON "link_posts"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "quote_posts_postId_key" ON "quote_posts"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "text_posts_postId_key" ON "text_posts"("postId");

-- AddForeignKey
ALTER TABLE "link_posts" ADD CONSTRAINT "link_posts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_posts" ADD CONSTRAINT "quote_posts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_posts" ADD CONSTRAINT "text_posts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
