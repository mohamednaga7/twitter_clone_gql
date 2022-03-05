import { PrismaClient } from '@prisma/client';

export class DbClient {
  private static _instance: PrismaClient;

  public static get instance() {
    if (!this._instance) {
      this._instance = new PrismaClient();
    }
    return this._instance;
  }
}
