import { DbClient } from "./../db/DbClient";

export const getAllUsers = async () => {
  const users = await DbClient.instance.user.findMany({
    select: {
      email: true,
      username: true,
      id: true,
      name: true,
      profileImageUrl: true,
      tweets: true,
      comments: true,
    },
  });
  return users;
};
