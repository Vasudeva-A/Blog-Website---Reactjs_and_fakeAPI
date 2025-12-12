import React from "react";
import { Box, Typography, Container, Grid, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#1a237e", color: "#fff", mt: 10, py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About / Description */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              About My Blog
            </Typography>
            <Typography sx={{ color: "#c5cae9", lineHeight: 1.8 }}>
              Welcome to My Blog! Here, you can find engaging articles, personal stories, tips, and inspiration on lifestyle, travel, and more.  
              Stay informed and inspired with our carefully curated posts.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/" underline="hover" color="inherit">Home</Link>
              <Link href="/posts" underline="hover" color="inherit">All Posts</Link>
              <Link href="/about" underline="hover" color="inherit">About</Link>
              <Link href="/contact" underline="hover" color="inherit">Contact</Link>
              <Link href="/privacy" underline="hover" color="inherit">Privacy Policy</Link>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Connect With Us
            </Typography>
            <Typography sx={{ color: "#c5cae9", mb: 2 }}>
              Follow us on social media for updates, news, and tips from our blog.
            </Typography>
            <Box>
              <IconButton sx={{ color: "#fff" }} href="https://facebook.com" target="_blank">
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }} href="https://twitter.com" target="_blank">
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }} href="https://instagram.com" target="_blank">
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }} href="https://linkedin.com" target="_blank">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom copyright */}
        <Box sx={{ textAlign: "center", mt: 5, borderTop: "1px solid #3949ab", pt: 3 }}>
          <Typography sx={{ color: "#c5cae9" }}>
            &copy; 2025 My Blog. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
