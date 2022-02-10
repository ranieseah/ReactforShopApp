import { React, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Stack } from "@mui/material";

const StepFour = (props) => {
  const [empty, setEmpty] = useState(false);
  const [paid, setPaid] = useState(false);

  const handleSubmit = () => {
    setEmpty(false);
    for (let i = 0; i < props.cart.length; i++) {
      if (
        props.addressId[i] == "undefined" ||
        props.productId[i] == "undefined"
      ) {
        setEmpty(true);
      }
    }

    if (empty === false) {
      const body = [];
      for (let i = 0; i < props.cart.length; i++) {
        const product = [];
        product.push(props.productId[i]);
        const data = {
          addresses_id: props.addressId[i],
          prod_id: product,
        };
        body.push(data);
      }

      console.log(body);
      fetch("http://127.0.0.1:8000/shop/add-orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.msg === "OK") {
            setPaid(true);
            props.setCart([]);
            props.setAddressId({ 0: "" });
            props.setProductId({ 0: "" });
          }
        });
    }
  };
  return (
    <>
      {empty === false && (
        <Container maxWidth="md">
          <Stack spacing={2}>
            <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
              Pay monies!
            </Typography>
            {paid === false && (
              <Button variant="contained" size="large" onClick={handleSubmit}>
                PAY!
              </Button>
            )}
          </Stack>
        </Container>
      )}

      {empty === true && (
        <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
          got empty fields....
        </Typography>
      )}
    </>
  );
};

export default StepFour;
