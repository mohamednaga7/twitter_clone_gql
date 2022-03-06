import { followUser } from './functions/followUser';
import { getAllUsers } from './functions/getAllUsers';
import { getUserById } from './functions/getUserById';
import { unFollowUser } from './functions/unfollowUser';

export default {
  Query: {
    users: getAllUsers,
    user: getUserById,
  },
  Mutation: {
    followUser,
    unFollowUser,
  },
};
