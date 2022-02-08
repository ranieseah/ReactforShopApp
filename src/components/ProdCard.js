import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ProdCard = (props) => {
  const handleAdd = () => {
    props.setCart((prevState) => {
      return [...prevState, props.prodId];
    });
  };

  const handleMinus = () => {
    props.setCart((prevState) => {
      const newState = [...prevState];
      newState.splice(newState.indexOf(props.prodId), 1);
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
          <Button size="small" onClick={handleAdd}>
            Add to Cart
          </Button>
        )}
        {props.cartCount > 0 && (
          <Button size="small" onClick={handleMinus}>
            -
          </Button>
        )}
        {props.cartCount > 0 && props.cartCount}
        {props.cartCount > 0 && (
          <Button size="small" onClick={handleAdd}>
            +
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProdCard;
