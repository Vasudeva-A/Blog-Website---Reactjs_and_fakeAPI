import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DescriptionCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const text = item.desc || item.content || "";
  const shortText = text.substring(0, 55);

  return (

    <Card
    sx={{
      borderRadius: 3,
      overflow: "hidden",
      boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
      transition: "0.25s",
      transform: "scale(0.95)",
      "&:hover": {
        transform: "scale(1)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
      },
      cursor: "pointer",
    }}
    >
      <CardMedia
        component="img"
        height="160"
        image={item.img}
        alt={item.title}
        sx={{ objectFit: "cover" }}
        onClick={() => navigate(`/post/${item.id}`)}
      />

      <CardContent sx={{ p: 1.8 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 1, cursor: "pointer" }}
          onClick={() => navigate(`/post/${item.id}`)}
        >
          {item.title}
        </Typography>

        <Typography variant="body2" sx={{ color: "gray" }}>
          {expanded ? text : shortText + "..."}
        </Typography>

        <Button
          size="small"
          sx={{ mt: 1, textTransform: "none", p: 0, fontSize: "13px" }}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {expanded ? "Read Less" : "Read More"}
        </Button>

        <Button
          variant="outlined"
          size="small"
          sx={{ borderRadius: "20px", textTransform: "none", mt: 1, ml: 2 }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/post/${item.id}`);
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default DescriptionCard;
