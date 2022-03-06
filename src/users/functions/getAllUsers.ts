import graphqlFields from 'graphql-fields';
import { DbClient } from '../../db/DbClient';
import { fieldsToQuery } from '../../shared/fieldsToQuery';

export const getAllUsers = async (
  _parent: any,
  _args: any,
  _context: any,
  info: any
) => {
  const fields = graphqlFields(info);
  const { select } = fieldsToQuery(fields);
  const users = await DbClient.instance.user.findMany({
    select: {
      password: false,
      ...select,
    },
  });
  return users;
};
