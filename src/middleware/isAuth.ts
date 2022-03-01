import { AuthTokenPayload } from './../auth/auth.types';
import { DbClient } from './../db/DbClient';
import { ForbiddenError } from 'apollo-server-errors';
import { User } from '@prisma/client';
import { verify } from 'jsonwebtoken';

export const isAuth: (authHeader: string | undefined) => Promise<User> = async (
  authHeader
) => {
  if (!authHeader || authHeader.trim() === '') {
    throw new ForbiddenError('You are not logged in');
  }

  const token = authHeader.split('Bearer ')[1];
  if (!token) throw new ForbiddenError('You are not logged in');
  const { id, email, username } = verify(
    token,
    process.env.JWT_SECRET || 'SUPER_SECRET'
  ) as AuthTokenPayload;

  const user = await DbClient.instance.user.findFirst({
    where: {
      AND: [{ id }, { email }, { username }],
    },
  });

  if (!user) throw new ForbiddenError('You are not logged in');

  return user;
};
