import * as mocha from "mocha";
import { assert, expect } from "chai";
import mongoose from "mongoose";
import config from "../src/config";
import Provider from "../src/models/provider";
const db = Provider.getInstance();
// importing services to test
import userService from "../src/modules/user/services";
import postService from "../src/modules/post/services";
import commentService from "../src/modules/comment/services";

/**
 * The codes inside this block will run before any tests in this file runs,
 * used for test suite initializing!
 */
before(async () => {
  await mongoose.connect(config.TEST_DATABASE_URL, {
    socketTimeoutMS: 3000,
    serverSelectionTimeoutMS: 3000,
  });
});

/**
 * The codes inside this block will be executed after all the tests in this file runs,
 * used for database cleanup!
 */
after(async () => {
  await cleanup();
  await mongoose.connection.close();
  process.exit();
});

var cleanup = async () => {
  await db.User.deleteMany();
  await db.Post.deleteMany();
  // await db.Comment.deleteMany(); should cascade delete!
  // await db.Comment.deleteMany(); should cascade delete!
};

let user: any,
  post: any,
  comments: any[] = [],
  error: any;

describe("testing suite for whole workflow", () => {
  // user related

  it("user creates an account successfully", async () => {
    try {
      const userInDB = await userService.createUser({
        user_id: 1,
        name: "Md. Sayeed Rahman",
        email: "learn@sayeed.com",
      });
      user = userInDB;
    } catch (err) {
      error = err;
    }
    assert.notExists(error);
    assert.exists(user);
  });
});
