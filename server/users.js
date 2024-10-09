const users = [
  {
    id: 1,
    username: "admin",
    password: "$2a$10$5R2f93cO1sMcdOn0AX52pOVtbL0xI5FzPE7UkE7Z4GpeSVQq7EYWG", // hashed password for 'admin123'
    role: "Admin",
  },
  {
    id: 2,
    username: "user",
    password: "$2a$10$5R2f93cO1sMcdOn0AX52pOVtbL0xI5FzPE7UkE7Z4GpeSVQq7EYWG", // hashed password for 'user123'
    role: "User",
  },
];

module.exports = users;
