import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const PostsGrid = ({ postsOverride }) => {
  const [posts, setPosts] = useState([]);
  const [openComments, setOpenComments] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (postsOverride) {
      setPosts(postsOverride);
    } else {
      axios
        .get("/posts")
        .then((res) => setPosts(res.data))
        .catch(console.log);
    }
  }, [postsOverride]);

  const toggleLike = async (post) => {
    const updated = {
      ...post,
      liked: !post.liked,
      likes: post.liked ? post.likes - 1 : post.likes + 1,
    };
    await axios.patch(`/posts/${post.id}`, updated);
    setPosts((prev) => prev.map((p) => (p.id === post.id ? updated : p)));
  };

  const toggleComments = (id) => {
    setOpenComments((prev) => (prev === id ? null : id));
  };

  const addComment = async (post) => {
    if (!user) return navigate("/login");
    if (!commentInput.trim()) return;

    const updated = {
      ...post,
      comments: [...post.comments, { user: user.name, text: commentInput }],
    };
    await axios.patch(`/posts/${post.id}`, updated);
    setPosts((prev) => prev.map((p) => (p.id === post.id ? updated : p)));
    setCommentInput("");
  };

  const deleteComment = async (post, index) => {
    const updatedComments = post.comments.filter((_, i) => i !== index);
    const updatedPost = { ...post, comments: updatedComments };
    await axios.patch(`/posts/${post.id}`, updatedPost);
    setPosts((prev) => prev.map((p) => (p.id === post.id ? updatedPost : p)));
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
        gap: 4,
        mt: 4,
      }}
    >
      {posts.map((post) => (
        <Card
          key={post.id}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            cursor: "pointer",
            transition: "0.4s",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            },
          }}
        >
          <Box sx={{ position: "relative" }} onClick={() => navigate(`/post/${post.id}`)}>
            <CardMedia
              component="img"
              height="200"
              image={post.img}
              alt={post.title}
              sx={{ objectFit: "cover" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                bgcolor: "rgba(0,0,0,0.5)",
                color: "#fff",
                p: 1.5,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {post.title}
              </Typography>
            </Box>
          </Box>

          <CardContent sx={{ pt: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: "#555",
                mb: 1,
                height: "48px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {post.content}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton onClick={() => toggleLike(post)} size="small">
                  {post.liked ? (
                    <FavoriteIcon sx={{ color: "red", fontSize: 20 }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                  )}
                </IconButton>
                <Typography variant="body2">{post.likes}</Typography>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
                onClick={() => toggleComments(post.id)}
              >
                <ChatBubbleOutlineIcon sx={{ fontSize: 20 }} />
                <Typography variant="body2">
                  {post.comments?.length || 0}
                </Typography>
              </Box>
            </Box>

            {openComments === post.id && (
              <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: "#f5f7fa" }}>
                {post.comments.length > 0 && (
                  <Typography sx={{ fontWeight: 600, mb: 1 }}>Comments</Typography>
                )}

                {post.comments.map((c, i) => (
                  <Box key={i} sx={{ display: "flex", gap: 1, mb: 1, alignItems: "center" }}>
                    <Avatar sx={{ width: 24, height: 24 }}>{c.user?.[0] || "A"}</Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
                        {c.user || "Anonymous"}
                      </Typography>
                      <Typography sx={{ fontSize: "0.85rem", color: "#444" }}>
                        {c.text}
                      </Typography>
                    </Box>
                    {user?.name === c.user && (
                      <IconButton
                        size="small"
                        sx={{ color: "red" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteComment(post, i);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                ))}

                <TextField
                  fullWidth
                  size="small"
                  placeholder="Write a comment..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  sx={{ mt: 1, borderRadius: 1 }}
                />
                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 1, borderRadius: "20px", textTransform: "none" }}
                  onClick={() => addComment(post)}
                >
                  Add Comment
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PostsGrid;
