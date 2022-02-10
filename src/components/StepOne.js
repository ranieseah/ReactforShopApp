import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const StepOne = (props) => {
  const stepOne = [];
  const skip = [];

  let totalCartPrice = 0;
  for (let i = 0; i < props.cart.length; i++) {
    totalCartPrice = totalCartPrice + props.cart[i].price;
    if (skip.indexOf(i) === -1) {
      let count = 1;
      for (let j = i + 1; j < props.cart.length; j++) {
        if (props.cart[i] === props.cart[j]) {
          count += 1;
          skip.push(j);
        }
      }
      const sumPrice = count * props.cart[i].price;
      stepOne.push(
        <>
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="delete">
                  ${sumPrice}
                </IconButton>
                <IconButton edge="end" aria-label="delete"></IconButton>
              </>
            }
          >
            <ListItemAvatar>
              <Avatar alt={props.cart[i].name} src={props.cart[i].image} />
            </ListItemAvatar>
            <ListItemText
              primary={props.cart[i].name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Order Qty: {count}
                  </Typography>
                  {}
                </React.Fragment>
              }
            />
          </ListItem>

          <Divider variant="inset" component="li" />
        </>
      );
    }
  }

  return (
    <>
      {props.activeStep === 0 && props.cart.length === 0 && (
        <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
          Nothing in cart....
        </Typography>
      )}
      {props.activeStep === 0 && props.cart.length > 0 && (
        <>
          <List
            sx={{
              width: "100%",
              maxWidth: 1200,
              bgcolor: "background.paper",
            }}
          >
            {stepOne}
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="delete">
                    ${totalCartPrice}
                  </IconButton>
                  <IconButton edge="end" aria-label="delete"></IconButton>
                </>
              }
            >
              <ListItemAvatar></ListItemAvatar>
              <ListItemText
                primary="Total Bill"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Total Qty: {props.cart.length}
                    </Typography>
                    {}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </>
      )}
    </>
  );
};
export default StepOne;
