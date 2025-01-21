import { createTheme } from "@mui/material/styles";

export const menuTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem!important",
          backgroundColor: "#D68240",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0A1316",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#FFF", // Gold color for links
          textDecoration: "none", // Remove underline
          fontSize: "18px",
          "&:hover": {
            color: "#D68240", // Change color on hover
            textDecoration: "none",
          },
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
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
