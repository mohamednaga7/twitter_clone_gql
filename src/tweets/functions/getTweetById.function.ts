import { DbClient } from './../../db/DbClient';

export const getTweetById = async (
  _parent: any,
  { tweetId }: { tweetId: string }
) => {
  const tweet = await DbClient.instance.tweet.findUnique({
    where: {
      id: tweetId,
    },
    include: {
      user: true,
      likes: true,
      comments: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  return tweet;
};
