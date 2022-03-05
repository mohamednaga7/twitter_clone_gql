import { IAppContext } from './../../shared/app.types';
import { isAuth } from './../../middleware/isAuth';
import { DbClient } from './../../db/DbClient';
import { ForbiddenError } from 'apollo-server-core';
import { fieldsToQuery } from '../../shared/fieldsToQuery';
import graphqlFields from 'graphql-fields';

export const currentUser = async (
  _parent: any,
  _args: any,
  { authToken }: IAppContext,
  info: any
) => {
  if (!authToken) throw new ForbiddenError('You are not logged in');

  const user = await isAuth(authToken);

  if (!user) {
    throw new ForbiddenError('You are not logged in');
  }

  const fields = graphqlFields(info);
  const dbUser = await DbClient.instance.user.findUnique({
    where: {
      id: user.id,
    },
    ...fieldsToQuery(fields),
  });
  return dbUser;
};
