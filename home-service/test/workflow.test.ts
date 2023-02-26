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
  await mongoose.connect(config.TEST_DATABASE_URL);
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
  await db.Comment.deleteMany();
};

let user: any,
  post: any,
  comment: any,
  comments: any[] = [],
  error: any;

let postLogCount: number = 0;

describe("testing suite for whole workflow", () => {
  // user related

  it("user creates an account successfully", async () => {
    try {
      const userInDB = await userService.create({
        user_id: 1,
        name: "Md. Sayeed Rahman",
        email: "learn@sayeed.com",
      });

      user = userInDB;
    } catch (err) {
      console.log(err);
      error = err;
    }
    assert.notExists(error);
    assert.exists(user);
  });

  it("user cannot create an account without email", async () => {
    try {
      await userService.create({
        user_id: 1001,
        name: "Sayem",
      });
    } catch (err) {
      error = err;
    }
    assert.exists(error);
  });

  it("user should not create an account with a duplicate email", async () => {
    try {
      const userInDB = await userService.create({
        user_id: 1002,
        name: "Md. Sayeed Rahman III",
        email: "learn@sayeed.com",
      });
      user = userInDB;
    } catch (err) {
      error = err;
    }
    assert.exists(error);
  });

  it("getAllUsers() working properly", async () => {
    try {
      const usersInDB = await userService.findAll();
      assert.equal(usersInDB.length, 1);
    } catch (err) {
      error = err;
      assert.equal(1, 2);
    }
  });

  it("getUserById() working properly", async () => {
    try {
      const userInDB = await userService.findById(user._id);
      assert.notDeepEqual(userInDB, user);
    } catch (err) {
      error = err;
      assert.equal(1, 2);
    }
  });

  it("updateUserById() working properly", async () => {
    try {
      const userInDB = await userService.updateById(user._id, {
        phone: "0123456",
      });
      assert.equal(userInDB?.phone, "0123456");
    } catch (err) {
      console.log(err);
      error = err;
      assert.equal(1, 2);
    }
  });

  it("post created successfully", async () => {
    try {
      const postInDB = await postService.create(
        {
          message: "Hello! I'm new to facebook...",
        },
        user
      );
      post = postInDB;
      assert.exists(post);
    } catch (err) {
      error = err;
      assert.notExists(error);
    }
  });

  it("when post was created, one log inserted", async () => {
    postLogCount = (await db.PostLog.find({ post_id: post._id })).length;
    assert.equal(postLogCount, 1);
  });

  it("commented on post successfully", async () => {
    try {
      const commentInDB = await commentService.createComment(
        post._id,
        {
          message: "Hello! This is a new comment...",
        },
        user
      );
      comment = commentInDB;
      const postInDB = await postService.findById(post._id);
      post = postInDB;
      assert.exists(comment);
      assert.equal(postInDB?.comments.length, 1);
    } catch (err) {
      console.log(err);
      error = err;
      assert.notExists(error);
    }
  });

  it("<< no logs should be inserted for comments on post, because i dont want db to be heavy on excessive logs >>", async () => {
    let temp = (await db.PostLog.find({ post_id: post._id })).length;
    assert.equal(temp, postLogCount + 0);
  });

  it("post updated successfully", async () => {
    try {
      const postInDB = await postService.updateById(
        post._id,
        {
          message: "Hello! I'm new to facebook... (updated)",
        },
        user
      );
      post = postInDB;
      assert.exists(post);
    } catch (err) {
      console.log(err);
      error = err;
      assert.notExists(error);
    }
  });

  it("when post was updated, log inserted successfully", async () => {
    let temp = (await db.PostLog.find({ post_id: post._id })).length;
    assert.equal(temp, postLogCount + 1);
    postLogCount = temp;
  });

  it("post soft deleted successfully", async () => {
    try {
      const postInDB = await postService.deleteById(post._id, false, user);
      post = postInDB;
      assert.exists(post.deletedAt);
    } catch (err) {
      console.log(err);
      error = err;
      assert.notExists(error);
    }
  });

  it("undo soft delete on post successfully", async () => {
    try {
      const postInDB = await postService.undoDelete(post._id, user);
      post = postInDB;
      assert.notExists(post.deletedAt); // should be null
    } catch (err) {
      console.log(err);
      error = err;
      assert.notExists(error);
    }
  });

  it("post hard deleted successfully", async () => {
    try {
      let commentCountBefore = (await commentService.findAll()).length;
      let commentCountOnPost = post.comments.length;
      await postService.deleteById(post._id, true, user); // hardDelete: true
      post = await postService.findById(post._id);
      assert.notExists(post);
      let commentCountAfter = (await commentService.findAll()).length;
      assert.equal(commentCountAfter, commentCountBefore - commentCountOnPost);
    } catch (err) {
      console.log(err);
      error = err;
      assert.notExists(error);
    }
  });

  it("<< cannot undo hard delete on post >>", async () => {
    try {
      const postInDB = await postService.undoDelete(user, post._id);
      post = postInDB;
      assert.notExists(post); // should be null
    } catch (err) {
      error = err;
      assert.exists(error);
    }
  });

  it("deleted users deleted posts too", async () => {
    try {
      const c = await Promise.all([
        postService.create({ message: "dummy post!" }, user),
        postService.create({ message: "dummy post!" }, user),
        postService.create({ message: "dummy post!" }, user),
      ]);
      const postCountBefore = (await postService.getAllPostsForAdmin()).length;
      await userService.delete({ email: user.email });
      const postCountAfter = (await postService.getAllPostsForAdmin()).length;
      assert.equal(postCountAfter, postCountBefore - 3);
    } catch (err) {
      // console.log(err);
      error = err;
      assert.notExists(error);
    }
  });
});
