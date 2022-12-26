import { saveUser } from "./auth.js";
export async function changeUser(user) {
  const response = await fetch(`/api/user/${getUser().id}`, {
    method: "PUT",
    body: user,
  });

  saveUser(response);
  return response;
}
