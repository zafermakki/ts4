import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Box,
  Pagination,
} from "@mui/material";

const Home = () => {
  // 📦 Data
  const [comments, setComments] = useState([]);
  const [newComments, setNewComments] = useState([]);
  const [deletedIds, setDeletedIds] = useState(new Set());

  const [loading, setLoading] = useState(false);

  // ➕ Add
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [adding, setAdding] = useState(false);

  // ✏️ Edit
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editBody, setEditBody] = useState("");
  const [updating, setUpdating] = useState(false);

  // 🗑️ Delete
  const [deletingId, setDeletingId] = useState(null);

  // 📄 Pagination
  const [page, setPage] = useState(1);
  const commentsPerPage = 6;

  // 🔽 Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  // ➕ Add Comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!name || !email || !body) return;

    setAdding(true);

    const newComment = {
      id: Date.now(),
      name,
      email,
      body,
    };

    try {
      await fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });

      setNewComments((prev) => [newComment, ...prev]);
      setPage(1); // ⬅️ ارجع لأول صفحة

      setName("");
      setEmail("");
      setBody("");
    } finally {
      setAdding(false);
    }
  };

  // ✏️ Start Edit
  const handleEditStart = (comment) => {
    setEditingId(comment.id);
    setEditName(comment.name);
    setEditEmail(comment.email);
    setEditBody(comment.body);
  };

  // ✏️ Update Comment
  const handleUpdateComment = async (id) => {
    if (!editName || !editEmail || !editBody) return;

    setUpdating(true);

    try {
      await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          email: editEmail,
          body: editBody,
        }),
      });

      setNewComments((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, name: editName, email: editEmail, body: editBody }
            : c
        )
      );

      setComments((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, name: editName, email: editEmail, body: editBody }
            : c
        )
      );

      setEditingId(null);
    } finally {
      setUpdating(false);
    }
  };

  // 🗑️ Delete Comment
  const handleDeleteComment = async (id) => {
    setDeletingId(id);

    try {
      await fetch(
        `https://jsonplaceholder.typicode.com/comments/${id}`,
        { method: "DELETE" }
      );

      setDeletedIds((prev) => new Set(prev).add(id));
    } finally {
      setDeletingId(null);
    }
  };

  // 👑 ترتيب + فلترة
  const allComments = [...newComments, ...comments].filter(
    (c) => !deletedIds.has(c.id)
  );

  // 📄 Pagination logic
  const totalPages = Math.ceil(allComments.length / commentsPerPage);
  const startIndex = (page - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const paginatedComments = allComments.slice(startIndex, endIndex);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" mb={3} textAlign="center">
        Comments
      </Typography>

      {/* ➕ Add */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack spacing={2} component="form" onSubmit={handleAddComment}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Comment"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
            <Button variant="contained" type="submit" disabled={adding}>
              {adding ? "Adding..." : "Add Comment"}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* 💬 Comments */}
      <Stack spacing={2}>
        {paginatedComments.map((comment) => (
          <Card key={comment.id}>
            <CardContent>
              {editingId === comment.id ? (
                <Stack spacing={2}>
                  <TextField
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <TextField
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                  <TextField
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    multiline
                    rows={3}
                  />
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      onClick={() => handleUpdateComment(comment.id)}
                      disabled={updating}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
              ) : (
                <>
                  <Typography variant="h6">{comment.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {comment.email}
                  </Typography>
                  <Typography mt={1}>{comment.body}</Typography>

                  <Stack direction="row" spacing={1} mt={2}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleEditStart(comment)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => handleDeleteComment(comment.id)}
                      disabled={deletingId === comment.id}
                    >
                      {deletingId === comment.id
                        ? "Deleting..."
                        : "Delete"}
                    </Button>
                  </Stack>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}

      {loading && (
        <Box textAlign="center" mt={3}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Home;
