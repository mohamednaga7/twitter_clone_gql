import { ForbiddenError } from 'apollo-server-core';
import graphqlFields from 'graphql-fields';
import { AuthTokenPayload } from '../../auth/auth.types';
import { DbClient } from '../../db/DbClient';
import { isAuth } from '../../middleware/isAuth';
import { IAppContext } from '../../shared/app.types';
import { fieldsToQuery } from '../../shared/fieldsToQuery';

export const followUser = async (
  _parent: any,
  { userId }: { userId: string },
  { authToken }: IAppContext,
  info: any
) => {
  if (!authToken) throw new ForbiddenError('You are not logged in');
  const { id } = (await isAuth(authToken)) as AuthTokenPayload;

  const fields = graphqlFields(info);
  const user = await DbClient.instance.user.update({
    where: {
      id,
    },
    data: {
      following: {
        connect: [{ id: userId }],
      },
    },
    ...fieldsToQuery(fields),
  });
  return user;
};
