import { React, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import Badge from "@mui/material/Badge";
import { useHistory } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = (props) => {
  const history = useHistory();
  const goLogin = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  const goLogout = () => {
    setAnchorEl(null);
    props.setUserInfo({
      name: "",
      token: "",
      isAdmin: false,
    });
    history.push("/");
  };

  const goIndex = () => {
    if (props.isAdmin) {
      history.push("/admin");
    } else {
      history.push("/");
    }
  };

  const goSummary = () => {
    history.push("/summary");
  };

  const goAllOrders = () => {
    history.push("/allorders");
  };

  const goProdOrders = () => {
    history.push("/productorders");
  };

  const goOrders = () => {
    history.push("/orders");
  };

  const goCart = () => {
    history.push("/cart");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
              onClick={goIndex}
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              get.CNYGoodies( )
            </Typography>
            {props.isAdmin === false && (
              <IconButton aria-label="cart" onClick={goCart}>
                <Badge badgeContent={props.cartLength} color="warning">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}
            {props.name === "" && (
              <Button color="inherit" onClick={goLogin}>
                Login
              </Button>
            )}
            {props.name}
            {props.name !== "" && (
              <>
                <Button color="inherit" onClick={handleClick}>
                  Menu
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  {props.isAdmin === false && (
                    <MenuItem onClick={goOrders}>Check Orders</MenuItem>
                  )}
                  {props.isAdmin === true && (
                    <MenuItem onClick={goSummary}>Orders Summary</MenuItem>
                  )}
                  {props.isAdmin === true && (
                    <MenuItem onClick={goAllOrders}>All Orders</MenuItem>
                  )}
                  {props.isAdmin === true && (
                    <MenuItem onClick={goProdOrders}>
                      Orders by Product
                    </MenuItem>
                  )}
                  <MenuItem onClick={goLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
