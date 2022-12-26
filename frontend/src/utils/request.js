import { getJwtToken } from "../apis/auth";
/**
 * 封裝瀏覽器自帶 fetch API 用於請求數據
 * 應用會於登錄後回傳 JWTToken，將其保存至以便後續請求帶上 JWTToken header
 * getJwtToken() 會從 localStorage 中獲取 token
 *
 * @param {string} url
 * @param {string} method
 * @param {string} headers
 * @param {object} body
 * @param {boolean} auth 是否請求 token
 * @returns
 */
export async function request(
  url,
  { method = "GET", headers, body, auth = true } = {}
) {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(auth && { Authorization: `Bearer ${getJwtToken()}` }),
      ...headers,
    },
    // 須將 JS Object 轉成 JSON 請求發送
    ...(body && { body: JSON.stringify(body) }),
  });

  const result = await res.json();
  return result;
}
