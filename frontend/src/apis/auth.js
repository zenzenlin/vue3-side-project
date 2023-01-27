import { request } from "../utils/request";

export function getJwtToken() {
  return localStorage.getItem("jwtToken");
}
export function setJwtToken(jwt) {
  localStorage.setItem("jwtToken", jwt);
}
export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}
export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
export async function register(email, username, password) {
  const result = await request(
    "http://localhost:1337/api/auth/local/register",
    {
      method: "POST",
      auth: false,
      body: {
        email,
        username,
        password,
        name: username,
      },
    }
  );

  setJwtToken(result.jwt);
  saveUser(result.user);
  return result.user;
}
export async function login(email, password) {
  const result = await request("http://localhost:1337/api/auth/local", {
    method: "POST",
    auth: false,
    body: {
      identifier: email,
      password,
    },
  });

  setJwtToken(result.jwt);
  saveUser(result.user);
  return result.user;
}

export function logout() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
}
