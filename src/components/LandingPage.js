import React, { useState, useEffect } from "react";
import ProdCard from "./ProdCard";
import { Grid } from "@mui/material";

const LandingPage = (props) => {
  const [products, setProducts] = useState(0);

  const fetchProducts = async (url) => {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      });

      if (res.status !== 200) {
        throw new Error("something went wrong");
      }
      const productResults = await res.json();
      setProducts(productResults);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const url = "http://127.0.0.1:8000/shop/products/";
    fetchProducts(url);
  }, []);

  const printCards = [];

  for (let i = 0; i < Object.keys(products).length; i++) {
    let cartCount = 0;
    for (const item of props.cart) {
      if (item === products[i].prod_id) {
        cartCount++;
      }
    }
    printCards.push(
      <Grid item xs={4}>
        <ProdCard
          image={products[i].image}
          name={products[i].name}
          description={products[i].description}
          price={products[i].price}
          prodId={products[i].prod_id}
          setCart={props.setCart}
          cartCount={cartCount}
        />
      </Grid>
    );
  }

  console.log(Object.keys(products));

  console.log(products[0]);
  console.log(Object.keys(products).length);
  console.log(printCards);
  return (
    <Grid container spacing={6} justifyContent="center">
      {printCards}
    </Grid>
  );
};

export default LandingPage;
