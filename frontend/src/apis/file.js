import { getJwtToken } from "./auth.js";

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("files", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    headers: { Authorization: `Bearer ${getJwtToken()}` },
  });

  const result = await response.json();
  return result[0].url;
}
