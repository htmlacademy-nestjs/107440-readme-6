-- DropForeignKey
ALTER TABLE "photo_posts" DROP CONSTRAINT "photo_posts_postId_fkey";

-- DropForeignKey
ALTER TABLE "video_posts" DROP CONSTRAINT "video_posts_postId_fkey";

-- AddForeignKey
ALTER TABLE "video_posts" ADD CONSTRAINT "video_posts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_posts" ADD CONSTRAINT "photo_posts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
