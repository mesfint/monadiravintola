import { AppBar, Box, Button, Container, Link, Toolbar } from "@mui/material";
import LOGO from "../../public/LOGO.png";

const pages = ["Home", "Menu", "About Us", "Order", "Contact"];

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* LOGO */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={LOGO}
              alt="Monadi Ravintola Logo"
              style={{ width: "120px", height: "auto", marginRight: "20px" }}
            />
          </Box>

          {/* NAVIGATION MENU */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", gap: 3 }}>
            {pages.map((page) => (
              <Link key={page} href="#" variant="body1">
                {page}
              </Link>
            ))}
          </Box>

          {/* BOOK TABLE BUTTON */}
          <Button variant="contained" color="secondary">
            Book Table
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
