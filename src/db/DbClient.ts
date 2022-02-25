import { PrismaClient } from "@prisma/client";

export class DbClient extends PrismaClient {
  private static _instance: DbClient;

  private constructor() {
    super();
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new DbClient();
    }
    return this._instance;
  }
}
