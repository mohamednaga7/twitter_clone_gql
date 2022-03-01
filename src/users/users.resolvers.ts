import { IAppContext } from './../shared/app.types';
import { AuthTokenPayload } from './../auth/auth.types';
import { isAuth } from './../middleware/isAuth';
import { DbClient } from './../db/DbClient';
import { getAllUsers } from './users.model';
import { ForbiddenError } from 'apollo-server-core';

const users = async () => {
  return await getAllUsers();
};

const followUser = async (
  _parent: any,
  { userId }: { userId: string },
  { authToken }: IAppContext
) => {
  if (!authToken) throw new ForbiddenError('You are not logged in');
  const { id, username, email } = (await isAuth(authToken)) as AuthTokenPayload;
  const user = await DbClient.instance.user.update({
    where: {
      id,
    },
    data: {
      following: {
        connect: [{ id: userId }],
      },
    },
  });
  return user;
};

const unFollowUser = async (
  _parent: any,
  { userId }: { userId: string },
  { authToken }: IAppContext
) => {
  if (!authToken) throw new ForbiddenError('You are not logged in');
  const { id, username, email } = (await isAuth(authToken)) as AuthTokenPayload;
  const user = await DbClient.instance.user.update({
    where: {
      id,
    },
    data: {
      following: {
        disconnect: [{ id: userId }],
      },
    },
  });
  return user;
};

export default {
  Query: {
    users,
  },
  Mutation: {
    followUser,
    unFollowUser,
  },
};
