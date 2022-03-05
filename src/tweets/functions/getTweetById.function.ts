import { DbClient } from './../../db/DbClient';

export const getTweetById = async (
  _parent: any,
  { tweetId }: { tweetId: string }
) => {
  const tweet = await DbClient.instance.tweet.findFirst({
    where: {
      AND: [{ id: tweetId }, { deletedAt: null }],
    },
    include: {
      user: true,
      likes: {
        include: {
          user: true,
        },
      },
      comments: {
        include: {
          user: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  return tweet;
};
