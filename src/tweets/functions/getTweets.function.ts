import { DbClient } from './../../db/DbClient';

export const getTweets = async () => {
  const tweets = await DbClient.instance.tweet.findMany({
    include: {
      user: true,
      likes: true,
      comments: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  console.log(tweets);
  return tweets;
};
