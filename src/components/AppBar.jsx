import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { styled } from "@mui/material";

const MenuAppBar = ({ title }) => {
  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link
            to="/"
            style={{
              display: "flex",
              gap: ".5rem",
              textDecoration: "none",
              color: "white",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <img
              src="/logo.png"
              alt="logo"
              style={{
                width: 48,
                height: 48,
                margin: "-5px",
              }}
            />
            <Typography variant="h6" component="div" flexGrow={1}>
              {title}
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
};

export default MenuAppBar;
