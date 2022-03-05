import graphQlFields from 'graphql-fields';
import { GraphQLResolveInfo } from 'graphql';
import { DbClient } from './../../db/DbClient';
import { fieldsToQuery } from '../../shared/fieldsToQuery';

export const getTweets = async (
  _parent: any,
  _args: any,
  _context: any,
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
