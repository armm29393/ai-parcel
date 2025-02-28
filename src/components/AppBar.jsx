import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material";

const MenuAppBar = ({ title }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const logout = () => {
    // localStorage.clear();
    setAuth(false);
    handleClose();
    navigate("/logout");
  };

  useEffect(() => {
    // check localstorage for token if valid setAuth to true else set to false
    if (localStorage.getItem("token")) {
      setAuth(true);
    }
    try {
      const me = JSON.parse(localStorage.getItem("me"));
      const name = `${me?.first_name ?? ""} ${me?.last_name ?? ""}`;
      setDisplayName(!name.replace(/\s/g, "").length ? "No Name" : name.trim());
    } catch (error) {
      setDisplayName("No Name");
    }
  }, [window.location.href]);

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
          {/* {auth && (
            <Box sx={{ alignItems: "center" }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ pr: 0 }}
              >
                <AccountCircle />
                <Typography variant="body1" color="initial" sx={{ ml: 0.5 }}>
                  {displayName}
                </Typography>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </Box>
          )} */}
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
};

export default MenuAppBar;
