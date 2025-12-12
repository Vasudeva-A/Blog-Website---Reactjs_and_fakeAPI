import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Card,
  CardMedia,
  Divider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "../api/axios";
import DescriptionCard from "./DescriptionCard";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);

        const postsRes = await axios.get("/posts");
        setAllPosts(postsRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  if (!post) return <Typography>Loading...</Typography>;

  const toggleLike = async () => {
    const updated = {
      ...post,
      liked: !post.liked,
      likes: post.liked ? post.likes - 1 : post.likes + 1,
    };
    await axios.patch(`/posts/${post.id}`, updated);
    setPost(updated);
  };

  const addComment = async () => {
    if (!commentInput.trim()) return;

    const updated = {
      ...post,
      comments: [...post.comments, { user: user?.name || "Anonymous", text: commentInput }],
    };
    await axios.patch(`/posts/${post.id}`, updated);
    setPost(updated);
    setCommentInput("");
  };

  // Similar posts excluding current
  const similarPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 4);

  return (
    <Box sx={{ p: 3, maxWidth: "800px", mx: "auto" }}>
      {/* Post Image */}
      <Card sx={{ borderRadius: 3 }}>
        <CardMedia
          component="img"
          height="300"
          image={post.img}
          alt={post.title}
          sx={{ objectFit: "cover" }}
        />
      </Card>

      {/* Post Title & Author */}
      <Typography variant="h4" sx={{ mt: 2, fontWeight: 700 }}>
        {post.title}
      </Typography>
      <Typography sx={{ mt: 1, opacity: 0.7, fontSize: "0.9rem" }}>
        By: {post.author || "Unknown"}
      </Typography>

      {/* Post Content */}
      <Typography sx={{ mt: 3, lineHeight: 1.6 }}>{post.content}</Typography>

      {/* Likes */}
      <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={toggleLike} size="small">
          {post.liked ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography sx={{ fontSize: "0.9rem" }}>{post.likes} Likes</Typography>
      </Box>

      {/* Comments */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Comments
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {post.comments.length === 0 ? (
          <Typography sx={{ color: "gray", fontSize: "0.9rem" }}>No comments yet</Typography>
        ) : (
          post.comments.map((c, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {c.user}
              </Typography>
              <Typography variant="body2" sx={{ ml: 1 }}>
                {c.text}
              </Typography>
            </Box>
          ))
        )}

        <TextField
          fullWidth
          size="small"
          placeholder="Add a comment…"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          sx={{ mt: 1, bgcolor: "white" }}
        />
        <Button
          variant="contained"
          sx={{ mt: 1, borderRadius: "20px", textTransform: "none", backgroundColor: "#43c2bbff" }}
          onClick={addComment}
        >
          Add Comment
        </Button>
      </Box>

      {/* Similar Posts */}
      {similarPosts.length > 0 && (
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Similar Posts
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {similarPosts.map((p) => (
              <DescriptionCard key={p.id} item={p} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PostPage;
