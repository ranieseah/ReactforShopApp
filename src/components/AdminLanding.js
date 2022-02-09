import React, { useState, useEffect } from "react";
import EditCard from "./EditCard";
import { Grid } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";

const AdminLanding = (props) => {
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

  const history = useHistory();
  const goAddProd = () => {
    history.push("/new-prod");
  };

  useEffect(() => {
    const url = "http://127.0.0.1:8000/shop/products/";
    fetchProducts(url);
  }, []);

  const printCards = [];

  for (let i = 0; i < Object.keys(products).length; i++) {
   
    printCards.push(
      <Grid item xs={4}>
        <EditCard
          image={products[i].image}
          name={products[i].name}
          description={products[i].description}
          price={products[i].price}
          prodId={products[i].prod_id}
        />
      </Grid>
    );
  }

  console.log(Object.keys(products));

  console.log(products[0]);
  console.log(Object.keys(products).length);
  console.log(printCards);
  return (
    <>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab color="primary" aria-label="add" onClick={goAddProd}>
          <AddIcon />
        </Fab>
      </Box>
      <Grid container spacing={6} justifyContent="center">
        {printCards}
      </Grid>
    </>
  );
};

export default AdminLanding;
