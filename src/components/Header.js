import { React, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import { useHistory } from "react-router-dom";
import Drawer from "@mui/material/Drawer";

const Header = (props) => {
  const history = useHistory();
  const goLogin = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  const goLogout = () => {
    props.setUserInfo({
      name: "",
      token: "",
      isAdmin: false,
    });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {props.name !== "" && <MenuIcon />}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              get.CNYGoodies( )
            </Typography>
            <IconButton aria-label="cart">
              <Badge badgeContent={props.cartLength} color="warning">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {props.name === "" && (
              <Button color="inherit" onClick={goLogin}>
                Login
              </Button>
            )}
            {props.name}
            {props.name !== "" && (
              <Button color="inherit" onClick={goLogout}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
