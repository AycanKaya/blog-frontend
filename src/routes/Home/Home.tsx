import { Link } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./Style/style.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

export default function Home() {
  const theme = createTheme({
    palette: {
      neutral: {
        main: "#0a0c0a",
        contrastText: "#fff",
      },
      primary: {
        light: "#ff7961",
        dark: "#0a0c0a",
        main: "#607d8c",
        contrastText: "#fff",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 2 }}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
              </Typography>
              <Link to="register">
                <Button color="neutral">Sign Up</Button>
              </Link>
              <Link to="login">
                <Button color="neutral">Login</Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </>
  );
}
