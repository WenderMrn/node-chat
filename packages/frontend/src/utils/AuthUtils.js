import jwt from "jsonwebtoken";

class AuthUtils {
  static getUser() {
    let decoded = { name: "NU", email: "-" };
    if (AuthUtils.getToken()) {
      try {
        decoded = jwt.decode(AuthUtils.getToken()); // change to verify end use the same secret on environment
      } catch (err) {
        // err
        console.error(decoded);
      }
    }

    return decoded;
  }

  static getToken() {
    return localStorage.getItem("token");
  }

  static setToken(token) {
    localStorage.setItem("token", token);
  }

  static clearToken() {
    localStorage.removeItem("token");
  }
}

export default AuthUtils;
