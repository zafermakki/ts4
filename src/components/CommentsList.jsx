import { Stack, Box, Pagination } from "@mui/material";
import CommentItem from "./CommentItem";
import { useState } from "react";

const CommentsList = ({ comments, onUpdate, onDelete }) => {
  const [page, setPage] = useState(1);
  const perPage = 6;

  const totalPages = Math.ceil(comments.length / perPage);
  const visible = comments.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <Stack spacing={2}>
        {visible.map((c) => (
          <CommentItem key={c.id} comment={c} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </Stack>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination count={totalPages} page={page} onChange={(e, v) => setPage(v)} />
        </Box>
      )}
    </>
  );
};

export default CommentsList;
