import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router";
import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

const steps = [
  "Confirm Products",
  "Confirm Addresses",
  "Confirm Delivery",
  "Payment",
];

const Cart = (props) => {
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [newRecipient, setNewRecipient] = useState("");
  const [rerror, setRerror] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [aerror, setAerror] = useState("");
  const [refetch, setRefetch] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const goIndex = () => {
    history.push("/");
  };

  const goLogin = () => {
    history.push("/login");
  };

  const handleRecipientChange = (e) => {
    setNewRecipient(e.target.value);
  };

  const handleAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleAdd = () => {
    if (newRecipient === "") {
      setRerror("Required");
    } else {
      setRerror("");
    }
    if (newAddress === "") {
      setAerror("Required");
    } else {
      setAerror("");
    }
    if (rerror === "" && aerror === "") {
      fetch("http://127.0.0.1:8000/shop/add-address/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.userInfo.token,
        },
        body: JSON.stringify({
          recipient_name: newRecipient,
          address: newAddress,
          account_of_id: props.userInfo.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.msg === "OK") {
            setRefetch((prevState) => {
              return prevState + 1;
            });
          }
        });
    }
  };

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

  useEffect(() => {
    if (props.userInfo.name !== "") {
      fetch("http://127.0.0.1:8000/shop/address/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.userInfo.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setAddresses(data);
        });
    }
  }, [refetch]);

  return (
    <Container maxWidth="md">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={goIndex}>Main Page</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              {/* STEP ONE HERE */}
              {activeStep === 0 && props.cart.length === 0 && (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Nothing in cart....
                </Typography>
              )}
              {activeStep === 0 && props.cart.length > 0 && (
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
                          <IconButton
                            edge="end"
                            aria-label="delete"
                          ></IconButton>
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
              {/* STEP TWO HERE */}
              {activeStep === 1 && (
                <>
                  <Container maxWidth="md">
                    <Stack direction="row" spacing={2}>
                      <TextField
                        id="outlined-helperText"
                        label="Recipient"
                        helperText={rerror}
                        value={newRecipient}
                        onChange={handleRecipientChange}
                      />
                      <TextField
                        id="outlined-helperText"
                        label="Address"
                        helperText={aerror}
                        value={newAddress}
                        multiline
                        rows={2}
                        onChange={handleAddressChange}
                      />
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleAdd}
                      >
                        Add
                      </Button>
                    </Stack>
                  </Container>
                </>
              )}
              {/* STEP THREE HERE */}
              {activeStep === 2 && <></>}

              {/* STEP FOUR HERE */}
              {activeStep === 3 && <></>}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {props.userInfo.name === "" && (
                <Button onClick={goLogin} color="warning">
                  Login to proceed..
                </Button>
              )}
              {props.userInfo.name !== "" && (
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1
                    ? "Yes I have paid Magical Monies!"
                    : "Next"}
                </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
};

export default Cart;
