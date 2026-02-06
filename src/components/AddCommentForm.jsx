import { Card, CardContent, Stack, TextField, Button } from "@mui/material";
import { useState } from "react";

const AddCommentForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !body) return;

    setAdding(true);
    await onAdd({
      id: Date.now(),
      name,
      email,
      body,
    });
    setName("");
    setEmail("");
    setBody("");
    setAdding(false);
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Stack spacing={2} component="form" onSubmit={handleSubmit}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Comment" multiline rows={3} value={body} onChange={(e) => setBody(e.target.value)} />
          <Button variant="contained" type="submit" disabled={adding}>
            {adding ? "Adding..." : "Add Comment"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AddCommentForm;
