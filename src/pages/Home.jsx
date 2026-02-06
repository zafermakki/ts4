import { Container, Typography, CircularProgress, Box } from "@mui/material";
import AddCommentForm from "../components/AddCommentForm";
import CommentsList from "../components/CommentsList";
import { useComments } from "../hooks/useComments";

const Home = () => {
  const { allComments, loading, addComment, updateComment, deleteComment } = useComments();

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" textAlign="center" mb={3}>
        Comments
      </Typography>

      <AddCommentForm onAdd={addComment} />
      <CommentsList comments={allComments} onUpdate={updateComment} onDelete={deleteComment} />

      {loading && (
        <Box textAlign="center" mt={3}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Home;
