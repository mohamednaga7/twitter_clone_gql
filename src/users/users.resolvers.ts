import { getAllUsers } from "./users.model";

const users = async () => {
  return await getAllUsers();
};

export default {
  Query: {
    users,
  },
  Mutation: {},
};
