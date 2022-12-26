export async function createComment({ content, postId }) {
  await request("/api/comments", {
    method: "POST",
    body: {
      data: {
        content,
        post: postId,
      },
    },
  });
}

export async function loadComment(postId) {
  if (!postId) return [];

  const response = await request(
    "/api/comments?populate=*&filters[post][id][$eq]=" + postId
  );

  return response.data.map((comment) => {
    const result = comment?.attributes;
    return {
      id: comment?.id,
      content: result?.content,
      pubDate: result?.pubLishedAt,
      user: {
        id: result?.user?.data?.id,
        ...result?.user?.data?.attributes,
      },
    };
  });
}
