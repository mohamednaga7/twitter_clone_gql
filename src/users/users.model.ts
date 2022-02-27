import { DbClient } from './../db/DbClient';

export const getAllUsers = async () => {
  const users = await DbClient.instance.user.findMany({
    include: {
      followedBy: true,
      following: true,
    },
  });
  return users;
};
