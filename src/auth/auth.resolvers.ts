import { DbClient } from "./../db/DbClient";
import { SignInDTO, SignUpDTO } from "./auth.types";
import { compare, hash } from "bcryptjs";
import { UserInputError } from "apollo-server-core";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const signUp = async (
  _: any,
  { userData: { email, name, password, username } }: { userData: SignUpDTO }
) => {
  console.log(email, name, password, username);
  if (!email || !name || !password || !username) {
    throw new UserInputError("incomplete data sent");
  }

  const hashedPassword = await hash(password, 15);

  try {
    const user = await DbClient.instance.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        name,
      },
    });

    return { user: { ...user, password: undefined }, token: "token" };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new UserInputError("Email/Username already in use");
      }
    }
  }
};

const signIn = async (_: any, { emailOrUsername, password }: SignInDTO) => {
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

  return { user: { ...user, password: undefined }, token: "token" };
};

export default {
  Query: {},
  Mutation: {
    signUp,
    signIn,
  },
};
