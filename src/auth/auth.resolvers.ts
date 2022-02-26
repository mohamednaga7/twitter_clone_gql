import { currentUser } from "./functions/currentUser.function";
import { signIn } from "./functions/signin.function";
import { signUp } from "./functions/signup.function";

export default {
  Query: {
    currentUser,
  },
  Mutation: {
    signUp,
    signIn,
  },
};
