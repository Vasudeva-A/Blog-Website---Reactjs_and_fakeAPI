import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);

        // Fetch all posts and filter similar posts
        const allPosts = await axios.get("/posts");
        const sim = allPosts.data.filter((item) => item.id !== res.data.id);
        setSimilar(sim.slice(0, 6)); // fetch 6 similar posts
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ width: { xs: "95%", md: "70%" }, mx: "auto", py: 4 }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        sx={{ mb: 3, textTransform: "none" }}
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </Button>

      {/* Main Post */}
      <Card sx={{ borderRadius: 3, mb: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        <CardMedia
          component="img"
          height="400"
          image={post.img}
          sx={{ borderRadius: 3, objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            {post.title}
          </Typography>
          <Typography sx={{ fontSize: "1.1rem", color: "gray", lineHeight: 1.6 }}>
            {post.content}
          </Typography>
        </CardContent>
      </Card>

      {/* Similar Posts */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        Similar Posts
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
          gap: 2,
        }}
      >
        {similar.length > 0 ? (
          similar.map((p) => (
            <Card
              key={p.id}
              sx={{
                borderRadius: 2,
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-4px)", boxShadow: "0 6px 18px rgba(0,0,0,0.15)" },
              }}
              onClick={() => navigate(`/post/${p.id}`)}
            >
              <CardMedia
                component="img"
                height="140"
                image={p.img}
                alt={p.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ p: 1.5 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "gray",
                    height: "40px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.content}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No similar posts found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default PostDetail;
