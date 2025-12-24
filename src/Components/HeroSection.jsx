import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 10,
        backgroundColor: "#e8eaf6",
        borderRadius: 3,
        mb: 5,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
        Welcome to My Blog
      </Typography>
      <Typography
        sx={{
          fontSize: "1.2rem",
          color: "#555",
          maxWidth: 600,
          mx: "auto",
          mb: 4,
        }}
      >
        Explore articles on lifestyle, travel, technology, and more. Read, get
        inspired, and share your thoughts with our community.
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#3949ab", color: "#fff", px: 4 }}
        onClick={() => navigate("/posts")}
      >
        Explore Posts
      </Button>
    </Box>
  );
};

export default HeroSection;
