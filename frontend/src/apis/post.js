import { request } from "../utils/request";
import { getJwtToken, getUser } from "../apis/auth";

export async function createPost(image, description) {
  const formData = new FormData();
  formData.append("files.image", image);
  formData.append("data", JSON.stringify({ description }));

  await fetch("http://localhost:1337/api/posts", {
    method: "POST",
    body: formData,
    headers: { Authorization: `Bearer ${getJwtToken()}` },
  });
}

export async function loadPosts(filters = "") {
  const response = await request(
    "http://localhost:1337/api/posts?populate=*" + (filters && `&${filters}`)
  );

  return response.data.map((post) => ({
    id: post?.id,
    ...post?.attributes,
    image: `http://localhost:1337${post?.attributes?.image?.data?.[0]?.attributes?.url}`,
    user: {
      id: post?.attributes?.user?.data?.id,
      avatar: `http://localhost:1337${post?.attributes?.user?.data?.attributes?.avatar}`,
      ...post?.attributes?.user?.data?.attributes,
    },
  }));
}

export async function loadPostByMe() {
  return loadPosts(`filters[user][id][$eq]=${getUser().id}`);
}
export async function loadLikeOrFavoriteByMe(type = "likes") {
  const response = await request(
    `http://localhost:1337/api/users/me?populate[${type}][populate][0]=image`
  );

  return response[type].map((post) => ({
    ...post,
    image: `http://localhost:1337${post?.image?.[0].url}`,
  }));
}
export async function likePost(id) {
  const response = await request(`http://localhost:1337/api/posts/${id}/like`, {
    method: "PUT",
  });

  return response.data;
}

export async function favoritePost(id) {
  const response = await request(
    `http://localhost:1337/api/posts/${id}/favor`,
    { method: "PUT" }
  );

  return response.data;
}
