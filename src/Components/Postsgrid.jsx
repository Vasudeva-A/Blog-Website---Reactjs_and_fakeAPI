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
import ReplyIcon from "@mui/icons-material/Reply";
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
  const [replyInputs, setReplyInputs] = useState({});
  const [openReplies, setOpenReplies] = useState({});

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
      comments: [
        ...(post.comments || []),
        { user: user.name, text: commentInput, likes: [], replies: [] },
      ],
    };
    await axios.patch(`/posts/${post.id}`, updated);
    setPosts((prev) => prev.map((p) => (p.id === post.id ? updated : p)));
    setCommentInput("");
  };

  const deleteComment = async (post, index) => {
    const updatedComments = (post.comments || []).filter((_, i) => i !== index);
    const updatedPost = { ...post, comments: updatedComments };
    await axios.patch(`/posts/${post.id}`, updatedPost);
    setPosts((prev) => prev.map((p) => (p.id === post.id ? updatedPost : p)));
  };

  const toggleCommentLike = async (post, cIndex) => {
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
    setPosts((prev) => prev.map((p) => (p.id === post.id ? updatedPost : p)));
  };

  const toggleReplyOpen = (postId, cIndex) => {
    const key = `${postId}_${cIndex}`;
    setOpenReplies((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setReplyInput = (postId, cIndex, value) => {
    const key = `${postId}_${cIndex}`;
    setReplyInputs((prev) => ({ ...prev, [key]: value }));
  };

  const addReply = async (post, cIndex) => {
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
    setPosts((prev) => prev.map((p) => (p.id === post.id ? updatedPost : p)));
    setReplyInputs((prev) => ({ ...prev, [key]: "" }));
    setOpenReplies((prev) => ({ ...prev, [key]: false }));
  };

  const deleteReply = async (post, cIndex, rIndex) => {
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
    setPosts((prev) => prev.map((p) => (p.id === post.id ? updatedPost : p)));
  };

  const toggleReplyLike = async (post, cIndex, rIndex) => {
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
          <Box
            sx={{ position: "relative" }}
            onClick={() => navigate(`/post/${post.id}`)}
          >
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
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(post);
                  }}
                  size="small"
                >
                  {user && (post.likedBy || []).includes(user.name) ? (
                    <FavoriteIcon sx={{ color: "red", fontSize: 20 }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                  )}
                </IconButton>
                <Typography variant="body2">
                  {post.likedBy?.length ?? post.likes ?? 0}
                </Typography>
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
                  <Typography sx={{ fontWeight: 600, mb: 1 }}>
                    Comments
                  </Typography>
                )}

                {post.comments.map((c, i) => (
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
                          <Typography
                            sx={{ fontWeight: 600, fontSize: "0.875rem" }}
                          >
                            {c.user || "Anonymous"}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.85rem", color: "#444" }}
                          >
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
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCommentLike(post, i);
                              }}
                            >
                              {user && (c.likes || []).includes(user.name) ? (
                                <FavoriteIcon
                                  sx={{ color: "red", fontSize: 18 }}
                                />
                              ) : (
                                <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                              )}
                            </IconButton>
                            <Typography variant="caption">
                              {(c.likes || []).length || 0}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleReplyOpen(post.id, i);
                              }}
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
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteComment(post, i);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    </Box>

                    {/* Replies list */}
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
                              <Typography
                                sx={{ fontSize: "0.8rem", color: "#444" }}
                              >
                                {r.text}
                              </Typography>
                            </Box>
                            <Box>
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleReplyLike(post, i, ri);
                                }}
                              >
                                {user && (r.likes || []).includes(user.name) ? (
                                  <FavoriteIcon
                                    sx={{ color: "red", fontSize: 16 }}
                                  />
                                ) : (
                                  <FavoriteBorderIcon sx={{ fontSize: 16 }} />
                                )}
                              </IconButton>
                              {user?.name === r.user && (
                                <IconButton
                                  size="small"
                                  sx={{ color: "red" }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteReply(post, i, ri);
                                  }}
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
                          onChange={(e) =>
                            setReplyInput(post.id, i, e.target.value)
                          }
                        />
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => addReply(post, i)}
                        >
                          Reply
                        </Button>
                      </Box>
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
