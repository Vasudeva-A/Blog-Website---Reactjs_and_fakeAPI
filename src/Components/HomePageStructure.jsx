import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePageStructure = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/blog");
    } else {
      navigate("/login", { state: { showAlert: true } }); 
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: { xs: 2, sm: 3, md: 3 }, // responsive padding
        bgcolor: "#f8fafc",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          mb: 2,
          maxWidth: { xs: "90%", sm: "800px" }, // responsive width
          lineHeight: 1.2,
          fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" }, // responsive font size
        }}
      >
        Discover, Learn, and Engage with Expert Articles and Blog Stories
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          opacity: 0.8,
          maxWidth: { xs: "90%", sm: "650px" },
          mb: 4,
          fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" }, // responsive font size
        }}
      >
        Explore in-depth articles, tutorials, and guides on the latest trends and technologies.
      </Typography>

      <Button
        variant="contained"
        sx={{
          px: { xs: 3, sm: 4 },
          py: { xs: 1, sm: 1.2 },
          borderRadius: "30px",
          fontSize: { xs: "0.9rem", sm: "1rem" }, // responsive font size
          textTransform: "none",
        }}
        onClick={handleGetStarted}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default HomePageStructure;
