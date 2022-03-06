import { ApolloError } from 'apollo-server-core';
import graphqlFields from 'graphql-fields';
import { DbClient } from '../../db/DbClient';
import { fieldsToQuery } from '../../shared/fieldsToQuery';

export const getUserById = async (
  _parent: any,
  { userId }: { userId: string },
  _context: any,
  info: any
) => {
  const fields = graphqlFields(info);
  const { select } = fieldsToQuery(fields);
  const user = await DbClient.instance.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      password: false,
      ...select,
    },
  });
  if (!user) {
    throw new ApolloError('User not found', '404');
  }
  return user;
};
