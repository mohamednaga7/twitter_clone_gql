import { isAuth } from "./../../middleware/isAuth";
import { DbClient } from "./../../db/DbClient";
import { ForbiddenError } from "apollo-server-core";

export const currentUser = async (
  _parent: any,
  _args: any,
  { authToken }: any
) => {
  if (!authToken) throw new ForbiddenError("You are not logged in");

  const user = await isAuth(authToken);

  return { ...user, password: undefined };
};
