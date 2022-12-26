import { getJwtToken } from "../apis/auth";

export async function createPost(image, description) {
  const formData = new FormData();
  formData.append("files.image", image);
  formData.append("data", JSON.stringify(description));

  await fetch("/api/posts", {
    method: "POST",
    body: formData,
    headers: { Authorization: `Bearer ${getJwtToken()}` },
  });
}

export async function loadPost(filters = "") {
  const response = await request(
    "/api/posts?populate=*" + (filters && `${filters} `)
  );
  return response.data.map((post) => ({
    id: post?.id,
    ...post?.attributes,
    image: post?.attributes?.image?.data?.[0]?.attributes?.url,
    user: {
      id: post?.attributes?.user?.data?.id,
      ...post?.attributes?.user?.data?.attributes,
    },
  }));
}

export async function loadPostByMe(id) {
  // return loadPost(`filters[user][id][$eq]=${getUser().id}`);
  console.log("loadPostByMe");
  return {
    image: "",
  };
}
export async function likePost() {
  const response = await request(`/api/posts/${id}/like`, { method: "PUT" });
  return response.data;
}

export async function favoritePost() {
  const response = await request(`/api/posts/${id}/favor`, { method: "PUT" });
  return response.data;
}
