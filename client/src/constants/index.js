export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const BASE_URL = "https://hasauth-server.vercel.app";

export const USER_ROLE = {
  ADMIN: "Admin",
  USER: "User",
};
