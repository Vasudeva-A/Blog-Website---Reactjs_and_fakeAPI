import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Categories = ({ categories }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 8 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Browse by Categories
      </Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {categories.map((cat, i) => (
          <Chip
            key={i}
            label={cat}
            onClick={() => navigate(`/category/${cat.toLowerCase()}`)}
            clickable
            sx={{
              fontWeight: 600,
              bgcolor: "#3949ab",
              color: "#fff",
              "&:hover": { bgcolor: "#1a237e" },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Categories;
