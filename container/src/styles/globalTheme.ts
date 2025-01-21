import { createTheme } from "@mui/material/styles";

export const globalTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0A1316", // Dark theme background for header
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          backgroundColor: "#D68240",
          "&:hover": {
            backgroundColor: "#B56430",
          },
        },
      },
    },
    MuiLink: {
        styleOverrides: {
          root: {
            color: "#FFF",
            textDecoration: "none",
            fontSize: "18px",
            "&:hover": {
              color: "#D68240",
            },
          },
        },
      },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0A1316", // Apply to all pages
          color: "#FFF",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#0A1316",
    },
    secondary: {
      main: "#D68240",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    
  },
});

export default globalTheme;
