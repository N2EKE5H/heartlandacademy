import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin user",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin12345", 10),
  },
  {
    name: "Test user",
    email: "test@test.com",
    password: bcrypt.hashSync("test12345", 10),
  },
];

export default users;
