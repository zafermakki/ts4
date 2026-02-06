import { useEffect, useState } from "react";
import {
  fetchCommentsApi,
  addCommentApi,
  updateCommentApi,
  deleteCommentApi,
} from "../services/commentsApi";

export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [newComments, setNewComments] = useState([]);
  const [deletedIds, setDeletedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchCommentsApi();
      setComments(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const addComment = async (comment) => {
    await addCommentApi(comment);
    setNewComments((prev) => [comment, ...prev]);
  };

  const updateComment = async (id, data) => {
    await updateCommentApi(id, data);
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c))
    );
    setNewComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c))
    );
  };

  const deleteComment = async (id) => {
    await deleteCommentApi(id);
    setDeletedIds((prev) => new Set(prev).add(id));
  };

  const allComments = [...newComments, ...comments].filter(
    (c) => !deletedIds.has(c.id)
  );

  return {
    allComments,
    loading,
    addComment,
    updateComment,
    deleteComment,
  };
};
