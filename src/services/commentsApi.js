const BASE_URL = "https://jsonplaceholder.typicode.com/comments";

export const fetchCommentsApi = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addCommentApi = async (comment) => {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
};

export const updateCommentApi = async (id, data) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const deleteCommentApi = async (id) => {
  return fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};
