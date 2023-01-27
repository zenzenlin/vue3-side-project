import { saveUser, getUser } from "./auth.js";
import { request } from "../utils/request";
export async function changeUser(user) {
  const response = await request(
    `http://localhost:1337/api/users/${getUser().id}`,
    {
      method: "PUT",
      body: user,
    }
  );

  saveUser(response);
  return response;
}
