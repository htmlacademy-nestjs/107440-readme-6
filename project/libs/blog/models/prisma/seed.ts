import { PrismaClient } from '@prisma/client';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const FIRST_VIDEO_POST_UUID = '5c308040-96a2-4162-bea6-2338e9976555';

const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';
const SECOND_VIDEO_POST_UUID = 'cb04593b-da99-4fe3-8b4b-e06d82e2efcc';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      userId: FIRST_USER_ID,
      state: 'Draft',
      type: 'Video',
      tags: [],
    },
    {
      id: SECOND_POST_UUID,
      userId: FIRST_USER_ID,
      state: 'Published',
      type: 'Photo',
      comments: [
        {
          message: 'Looks amazing!',
          userId: FIRST_USER_ID,
        },
        {
          message: 'Nice',
          userId: SECOND_USER_ID,
        },
      ],
    },
  ];
}

function getVideoPosts() {
  return [
    {
      id: FIRST_VIDEO_POST_UUID,
      title: 'Metallica - One (Drums cover)',
      videoUrl: 'testUrl1',
      postId: FIRST_POST_UUID,
    },
    {
      id: SECOND_VIDEO_POST_UUID,
      title: 'My visit to NY',
      videoUrl: 'testUrl2',
      postId: SECOND_POST_UUID,
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();

  for (const post of mockPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        userId: post.userId,
        state: post.state,
        type: post.type,
        comments: post.comments
          ? {
              create: post.comments,
            }
          : undefined,
      },
    });
  }

  const mockVideoPosts = getVideoPosts();

  for (const post of mockVideoPosts) {
    await prismaClient.videoPost.create({
      data: {
        id: post.id,
        title: post.title,
        videoUrl: post.videoUrl,
        postId: post.postId,
      },
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
