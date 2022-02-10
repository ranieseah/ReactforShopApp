import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const ProdCard = (props) => {
  const handleAdd = () => {
    props.setCart((prevState) => {
      return [...prevState, props.product];
    });
  };

  const handleMinus = () => {
    props.setCart((prevState) => {
      const newState = [...prevState];
      newState.splice(newState.indexOf(props.product), 1);
      return newState;
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={props.prodId}
        height="140"
        image={props.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name} -- ${props.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        {props.cartCount === 0 && (
          <IconButton edge="end" aria-label="add to cart" onClick={handleAdd}>
            <AddShoppingCartIcon />
          </IconButton>
        )}
        {props.cartCount > 0 && (
          <IconButton edge="end" aria-label="minus" onClick={handleMinus}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        )}
        {props.cartCount > 0 && (
          <IconButton edge="end" aria-label="count">
            {props.cartCount}
          </IconButton>
        )}
        {props.cartCount > 0 && (
          <IconButton edge="end" aria-label="add" onClick={handleAdd}>
            <AddCircleOutlineIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default ProdCard;
