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
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";

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

export default function HomeResponsiveBar() {
  const theme = createTheme({
    palette: {
      neutral: {
        main: "#D8DCD6",
        contrastText: "#D8DCD6",
      },
      primary: {
        main: "#3B719F",
        contrastText: "#fafdff",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 2 }}>
          <AppBar
            position="static"
            color="primary"
            sx={{ borderRadius: "10px" }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <EmojiNatureIcon
                  sx={{
                    display: {
                      xs: "none",
                      md: "flex",
                      fontSize: "40px",
                      color: "#D8DCD6",
                    },
                    mr: 1,
                  }}
                />
              </IconButton>
              <Typography
                sx={{
                  fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                  flexGrow: 1,
                }}
                variant="h6"
                component="div"
              >
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
