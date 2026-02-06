import { Card, CardContent, Typography, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

const CommentItem = ({ comment, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(comment);

  return (
    <Card>
      <CardContent>
        {editing ? (
          <Stack spacing={2}>
            <TextField value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <TextField multiline rows={3} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
            <Stack direction="row" spacing={1}>
              <Button variant="contained" onClick={() => { onUpdate(comment.id, form); setEditing(false); }}>
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        ) : (
          <>
            <Typography variant="h6">{comment.name}</Typography>
            <Typography variant="body2" color="text.secondary">{comment.email}</Typography>
            <Typography mt={1}>{comment.body}</Typography>
            <Stack direction="row" spacing={1} mt={2}>
              <Button size="small" variant="outlined" onClick={() => setEditing(true)}>Edit</Button>
              <Button size="small" color="error" variant="outlined" onClick={() => onDelete(comment.id)}>Delete</Button>
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentItem;
