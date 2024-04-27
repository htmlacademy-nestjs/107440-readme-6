import { PrismaClient } from '@prisma/client';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const FIRST_VIDEO_POST_UUID = '5c308040-96a2-4162-bea6-2338e9976555';

const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';
const SECOND_VIDEO_POST_UUID = 'cb04593b-da99-4fe3-8b4b-e06d82e2efcc';

const THIRD_POST_UUID = 'dv04593b-da99-4fe3-8b4b-e06d82e2efgg';
const THIRD_PHOTO_POST_UUID = 'lk04593b-da99-4fe3-8b4b-e06d82e2efhh';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';
const THIRD_USER_ID = '6581762309c030b503e30518';

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      userId: FIRST_USER_ID,
      state: 'draft',
      type: 'video',
      tags: [],
    },
    {
      id: SECOND_POST_UUID,
      userId: FIRST_USER_ID,
      state: 'published',
      type: 'video',
      tags: [],
    },
    {
      id: THIRD_POST_UUID,
      userId: SECOND_USER_ID,
      state: 'published',
      type: 'photo',
      comments: [
        {
          message: 'Looks amazing!',
          userId: THIRD_USER_ID,
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

function getPhotoPosts() {
  return [
    {
      id: THIRD_PHOTO_POST_UUID,
      photo: 'test photo data',
      postId: THIRD_POST_UUID,
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

  const mockPhotoPosts = getPhotoPosts();

  for (const post of mockPhotoPosts) {
    await prismaClient.photoPost.create({
      data: {
        id: post.id,
        photo: post.photo,
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
