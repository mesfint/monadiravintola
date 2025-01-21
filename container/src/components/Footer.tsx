// src/components/Footer.tsx (Inside Container App)
import { Typography, Box, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#0A1316", color: "#FFF", p: 2, mt: 4 }}>
      <Container maxWidth="xl" sx={{ textAlign: "center" }}>
        <Typography variant="body2">© 2025 Monadi Ravintola</Typography>
      </Container>
    </Box>
  );
};

export default Footer;
