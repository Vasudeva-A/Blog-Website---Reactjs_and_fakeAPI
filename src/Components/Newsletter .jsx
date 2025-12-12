import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) return;
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <Box
      sx={{
        py: 8,
        textAlign: "center",
        backgroundColor: "#e3f2fd",
        borderRadius: 3,
        mb: 10,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Subscribe to Our Newsletter
      </Typography>
      <Typography sx={{ color: "#555", mb: 3 }}>
        Get the latest articles delivered straight to your inbox
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
        <TextField
          placeholder="Enter your email"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubscribe} sx={{ backgroundColor: "#3949ab", color: "#fff" }}>
          Subscribe
        </Button>
      </Box>
    </Box>
  );
};

export default Newsletter;
