import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { UserInputError } from "apollo-server-core";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { DbClient } from "../../db/DbClient";
import { SignUpDTO } from "../auth.types";

export const signUp = async (
  _: any,
  { userData: { email, name, password, username } }: { userData: SignUpDTO }
) => {
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

    const token = sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET || "SUPER_SECRET"
    );

    return { user: { ...user, password: undefined }, token };
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new UserInputError("Email/Username already in use");
      }
    }
  }
};
