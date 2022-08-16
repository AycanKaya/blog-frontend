import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import "./Style/style.css";
import Button from "../../components/Button";

import EmojiNatureIcon from "@mui/icons-material/EmojiNature";

export default function HomeResponsiveBar() {
  return (
    <>
      <Box sx={{ flexGrow: 2 }}>
        <AppBar position="static" color="primary" sx={{ borderRadius: "10px" }}>
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
    </>
  );
}
