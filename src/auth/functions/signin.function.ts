import { UserInputError } from "apollo-server-core";
import { compare } from "bcryptjs";
import { DbClient } from "../../db/DbClient";
import { SignInDTO } from "../auth.types";
import { sign } from "jsonwebtoken";

export const signIn = async (
  _: any,
  { emailOrUsername, password }: SignInDTO
) => {
  if (!emailOrUsername || !password) {
    throw new UserInputError("Incomplete data sent");
  }

  const user = await DbClient.instance.user.findFirst({
    where: {
      OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
    },
  });

  if (!user) {
    throw new UserInputError("Wrong Credentials");
  }

  const passwordCorrect = await compare(password, user.password);
  if (!passwordCorrect) {
    throw new UserInputError("Wrong Credentials");
  }

  const token = sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET || "SUPER_SECRET",
    {
      expiresIn: "30 days",
    }
  );

  return { user: { ...user, password: undefined }, token };
};
