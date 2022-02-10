import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Summary = (props) => {
  const [summary, setSummary] = useState([]);
  const [prod, setProd] = useState("");
  const [products, setProducts] = useState([]);

  const prodList = [];
  for (let i = 0; i < products.length; i++) {
    prodList.push(
      <MenuItem value={products[i].prod_id}>{products[i].name}</MenuItem>
    );
  }

  const handleprodChange = (e) => {
    setProd(e.target.value);
  };

  function createData(status, orders) {
    return { status, orders };
  }
  // const rows = [];
  // for (let i = 0; i < order.length; i++) {
  //   let status;
  //   if (order[i].order_status === "PR") {
  //     status = "Processing Order..";
  //   } else if (order[i].order_status === "RY") {
  //     status = "Goods are Ready! Awaiting Pickup";
  //   } else if (order[i].order_status === "DE") {
  //     status = "Out for Delivery...";
  //   } else status = "Complete!";
  //   rows.push(createData(order[i].batch_id, status));
  // }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/shop/all-products/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    if (prod !== "") {
      fetch("http://127.0.0.1:8000/shop/view-prod-stats/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSummary(data);
        });
    }
  }, [prod]);

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Product ID</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={prod}
          label="Product"
          onChange={handleprodChange}
        >
          {prodList}
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
    </>
  );
};

export default Summary;
