import graphqlFields from 'graphql-fields';
import { fieldsToQuery } from '../../shared/fieldsToQuery';
import { DbClient } from './../../db/DbClient';

export const getTweetById = async (
  _parent: any,
  { tweetId }: { tweetId: string },
  info: any
) => {
  const fields = graphqlFields(info);
  const tweet = await DbClient.instance.tweet.findFirst({
    where: {
      AND: [{ id: tweetId }, { deletedAt: null }],
    },
    ...fieldsToQuery(fields),
  });
  return tweet;
};
