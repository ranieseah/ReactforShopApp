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
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

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
  const [refetch, setRefetch] = useState(0);
  const [addressId, setAddressId] = useState({ 0: "" });
  const [productId, setProductId] = useState({ 0: "" });

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
              <StepOne activeStep={activeStep} cart={props.cart} />
              {/* STEP TWO HERE */}
              <StepTwo
                addresses={addresses}
                setRefetch={setRefetch}
                activeStep={activeStep}
                userInfo={props.userInfo}
              />
              {/* STEP THREE HERE */}
              {activeStep === 2 && (
                <StepThree
                  addresses={addresses}
                  cart={props.cart}
                  addressId={addressId}
                  setAddressId={setAddressId}
                  productId={productId}
                  setProductId={setProductId}
                />
              )}
              {/* STEP FOUR HERE */}
              {activeStep === 3 && (
                <StepFour
                  cart={props.cart}
                  addressId={addressId}
                  productId={productId}
                  token={props.userInfo.token}
                  setCart={props.setCart}
                  setAddressId={setAddressId}
                  setProductId={setProductId}
                />
              )}
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
              {props.userInfo.name === "" && props.cart.length > 0 && (
                <Button onClick={goLogin} color="warning">
                  Login to proceed..
                </Button>
              )}
              {activeStep === 0 &&
                props.userInfo.name !== "" &&
                props.cart.length > 0 && (
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1
                      ? "Yes I have paid Magical Monies!"
                      : "Next"}
                  </Button>
                )}
              {activeStep !== 0 && (
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
