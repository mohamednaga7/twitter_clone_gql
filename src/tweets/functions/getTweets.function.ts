import graphQlFields from 'graphql-fields';
import { GraphQLResolveInfo } from 'graphql';
import { DbClient } from './../../db/DbClient';
import { fieldsToQuery } from '../../shared/fieldsToQuery';

export const getTweets = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const fields = graphQlFields(info);
  const tweets = await DbClient.instance.tweet.findMany({
    where: {
      deletedAt: null,
    },
    ...fieldsToQuery(fields),
    orderBy: {
      createdAt: 'desc',
    },
  });
  return tweets;
};
