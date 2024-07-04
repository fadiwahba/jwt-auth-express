const request = require("supertest");
const app = require("../../app"); // Adjust the path to your app file
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

describe("User CRUD operations", () => {
  let token;
  let testUser;
  beforeEach(async () => {
    const hashedPassword = await bcrypt.hash("password123", 10);
    testUser = new User({
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      role: "admin",
    });
    await testUser.save();
    console.log("Test user created:", testUser);

    const res = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "password123",
    });

    token = res.body.token;
  });

  test("should register a new user", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
  });

  test("should login a user", async () => {
    const loginData = {
      email: testUser.email,
      password: "password123",
    };
    console.log("Sending login request:", loginData);
    const res = await request(app).post("/api/users/login").send(loginData);

    console.log("Login response:", res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  test("should get user profile", async () => {
    const res = await request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", "test@example.com");
  });

  test("should update user profile", async () => {
    const res = await request(app)
      .put("/api/users/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "newemail@example.com",
        password: "newpassword123",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Profile updated successfully");
  });

  test("should delete a user", async () => {
    const newUser = new User({
      name: "Delete User",
      email: "delete@example.com",
      password: "password123",
    });
    await newUser.save();
    console.log("New user created:", newUser);

    const res = await request(app)
      .delete(`/api/users/${newUser._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "User deleted successfully");
  });
});
