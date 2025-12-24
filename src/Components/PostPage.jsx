import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Card,
  CardMedia,
  Divider,
  Avatar,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import axios from "../api/axios";
import DescriptionCard from "./DescriptionCard";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [replyInputs, setReplyInputs] = useState({});
  const [openReplies, setOpenReplies] = useState({});

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
    if (!user) return navigate("/login");
    const likedBy = new Set(post.likedBy || []);
    if (likedBy.has(user.name)) likedBy.delete(user.name);
    else likedBy.add(user.name);

    const updated = {
      ...post,
      likedBy: Array.from(likedBy),
      likes: likedBy.size,
    };
    await axios.patch(`/posts/${post.id}`, updated);
    setPost(updated);
  };

  const addComment = async () => {
    if (!user) return navigate("/login");
    if (!commentInput.trim()) return;

    const updated = {
      ...post,
      comments: [
        ...(post.comments || []),
        { user: user.name, text: commentInput, likes: [], replies: [] },
      ],
    };
    await axios.patch(`/posts/${post.id}`, updated);
    setPost(updated);
    setCommentInput("");
  };

  const toggleCommentLike = async (cIndex) => {
    if (!user) return navigate("/login");
    const comments = post.comments || [];
    const comment = comments[cIndex];
    const likesSet = new Set(comment.likes || []);
    if (likesSet.has(user.name)) likesSet.delete(user.name);
    else likesSet.add(user.name);

    const updatedComment = { ...comment, likes: Array.from(likesSet) };
    const updatedComments = comments.map((c, i) =>
      i === cIndex ? updatedComment : c
    );
    const updatedPost = { ...post, comments: updatedComments };
    await axios.patch(`/posts/${post.id}`, updatedPost);
    setPost(updatedPost);
  };

  const toggleReplyOpen = (cIndex) => {
    const key = `${post.id}_${cIndex}`;
    setOpenReplies((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setReplyInput = (cIndex, value) => {
    const key = `${post.id}_${cIndex}`;
    setReplyInputs((prev) => ({ ...prev, [key]: value }));
  };

  const addReply = async (cIndex) => {
    if (!user) return navigate("/login");
    const key = `${post.id}_${cIndex}`;
    const val = (replyInputs[key] || "").trim();
    if (!val) return;

    const comments = post.comments || [];
    const comment = comments[cIndex];
    const replies = comment.replies || [];
    const newReply = { user: user.name, text: val, likes: [] };
    const updatedComment = { ...comment, replies: [...replies, newReply] };
    const updatedComments = comments.map((c, i) =>
      i === cIndex ? updatedComment : c
    );
    const updatedPost = { ...post, comments: updatedComments };
    await axios.patch(`/posts/${post.id}`, updatedPost);
    setPost(updatedPost);
    setReplyInputs((prev) => ({ ...prev, [key]: "" }));
    setOpenReplies((prev) => ({ ...prev, [key]: false }));
  };

  const deleteReply = async (cIndex, rIndex) => {
    if (!user) return navigate("/login");
    const comments = post.comments || [];
    const comment = comments[cIndex];
    const reply = comment.replies?.[rIndex];
    if (!reply) return;
    if (reply.user !== user.name) return;

    const updatedReplies = (comment.replies || []).filter(
      (_, i) => i !== rIndex
    );
    const updatedComment = { ...comment, replies: updatedReplies };
    const updatedComments = comments.map((c, i) =>
      i === cIndex ? updatedComment : c
    );
    const updatedPost = { ...post, comments: updatedComments };
    await axios.patch(`/posts/${post.id}`, updatedPost);
    setPost(updatedPost);
  };

  const toggleReplyLike = async (cIndex, rIndex) => {
    if (!user) return navigate("/login");
    const comments = post.comments || [];
    const comment = comments[cIndex];
    const reply = comment.replies?.[rIndex];
    if (!reply) return;

    const likesSet = new Set(reply.likes || []);
    if (likesSet.has(user.name)) likesSet.delete(user.name);
    else likesSet.add(user.name);

    const updatedReply = { ...reply, likes: Array.from(likesSet) };
    const updatedReplies = (comment.replies || []).map((r, i) =>
      i === rIndex ? updatedReply : r
    );
    const updatedComment = { ...comment, replies: updatedReplies };
    const updatedComments = comments.map((c, i) =>
      i === cIndex ? updatedComment : c
    );
    const updatedPost = { ...post, comments: updatedComments };
    await axios.patch(`/posts/${post.id}`, updatedPost);
    setPost(updatedPost);
  };

  const deleteComment = async (index) => {
    if (!user) return navigate("/login");
    const comment = post.comments?.[index];
    if (!comment) return;
    if (comment.user !== user.name) return; // only author

    const updatedComments = (post.comments || []).filter((_, i) => i !== index);
    const updatedPost = { ...post, comments: updatedComments };
    await axios.patch(`/posts/${post.id}`, updatedPost);
    setPost(updatedPost);
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
          {user && (post.likedBy || []).includes(user.name) ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <Typography sx={{ fontSize: "0.9rem" }}>
          {(post.likedBy || []).length || post.likes || 0} Likes
        </Typography>
      </Box>

      {/* Comments */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Comments
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {!post.comments || post.comments.length === 0 ? (
          <Typography sx={{ color: "gray", fontSize: "0.9rem" }}>
            No comments yet
          </Typography>
        ) : (
          (post.comments || []).map((c, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    flexGrow: 1,
                  }}
                >
                  <Avatar sx={{ width: 24, height: 24 }}>
                    {c.user?.[0] || "A"}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {c.user}
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {c.text}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        mt: 0.5,
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => toggleCommentLike(i)}
                      >
                        {user && (c.likes || []).includes(user.name) ? (
                          <FavoriteIcon sx={{ color: "red", fontSize: 18 }} />
                        ) : (
                          <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                        )}
                      </IconButton>
                      <Typography variant="caption">
                        {(c.likes || []).length || 0}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => toggleReplyOpen(i)}
                      >
                        <ReplyIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                      <Typography variant="caption">
                        {(c.replies || []).length || 0} replies
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  {user?.name === c.user && (
                    <IconButton
                      size="small"
                      sx={{ color: "red" }}
                      onClick={() => deleteComment(i)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>

              {/* Replies */}
              {(c.replies || []).length > 0 && (
                <Box sx={{ pl: 4, mt: 1 }}>
                  {(c.replies || []).map((r, ri) => (
                    <Box
                      key={ri}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <Avatar sx={{ width: 20, height: 20 }}>
                        {r.user?.[0] || "A"}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          sx={{ fontWeight: 600, fontSize: "0.8rem" }}
                        >
                          {r.user}
                        </Typography>
                        <Typography sx={{ fontSize: "0.8rem", color: "#444" }}>
                          {r.text}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton
                          size="small"
                          onClick={() => toggleReplyLike(i, ri)}
                        >
                          {user && (r.likes || []).includes(user.name) ? (
                            <FavoriteIcon sx={{ color: "red", fontSize: 16 }} />
                          ) : (
                            <FavoriteBorderIcon sx={{ fontSize: 16 }} />
                          )}
                        </IconButton>
                        {user?.name === r.user && (
                          <IconButton
                            size="small"
                            sx={{ color: "red" }}
                            onClick={() => deleteReply(i, ri)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Reply input */}
              {openReplies[`${post.id}_${i}`] && (
                <Box sx={{ display: "flex", gap: 1, mt: 1, pl: 4 }}>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Write a reply..."
                    value={replyInputs[`${post.id}_${i}`] || ""}
                    onChange={(e) => setReplyInput(i, e.target.value)}
                  />
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => addReply(i)}
                  >
                    Reply
                  </Button>
                </Box>
              )}
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
          sx={{
            mt: 1,
            borderRadius: "20px",
            textTransform: "none",
            backgroundColor: "#43c2bbff",
          }}
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
