import { getAllUsers } from './users.model';
import { followUser } from './functions/followUser';
import { unFollowUser } from './functions/unfollowUser';

const users = async () => {
  return await getAllUsers();
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
