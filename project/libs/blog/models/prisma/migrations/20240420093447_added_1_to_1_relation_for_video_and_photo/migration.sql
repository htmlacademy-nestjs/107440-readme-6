/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `photo_posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId]` on the table `video_posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `photo_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Made the column `postId` on table `video_posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "photo_posts" ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "video_posts" ALTER COLUMN "postId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "photo_posts_postId_key" ON "photo_posts"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "video_posts_postId_key" ON "video_posts"("postId");

-- AddForeignKey
ALTER TABLE "video_posts" ADD CONSTRAINT "video_posts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_posts" ADD CONSTRAINT "photo_posts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
