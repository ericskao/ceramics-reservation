const jwt = require("jsonwebtoken");

export function decodeCookie(cookie?: string) {
  const token = cookie
    ?.split("; ")
    ?.find((str: string) => str.includes("token="))
    ?.split("token=")[1];
  return jwt.decode(token);
}
