-- CreateTable
CREATE TABLE "video_posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "postId" TEXT,

    CONSTRAINT "video_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "link_posts" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "description" TEXT,
    "postId" TEXT,

    CONSTRAINT "link_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_posts" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "quote_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "announcement" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "text_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo_posts" (
    "id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "photo_posts_pkey" PRIMARY KEY ("id")
);
