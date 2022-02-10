import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ViewCustomerOrder = (props) => {
  const params = useParams();
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [products, setProducts] = useState([]);

  function createData(ID, recipient, product, status) {
    return { ID, recipient, product, status };
  }
  const rows = [];
  for (let i = 0; i < orders.length; i++) {
    let status;
    if (orders[i].order_status === "PR") {
      status = "Processing Order..";
    } else if (orders[i].order_status === "RY") {
      status = "Goods are Ready! Awaiting Pickup";
    } else if (orders[i].order_status === "DE") {
      status = "Out for Delivery...";
    } else status = "Complete!";

    let orderRecipient = "";
    for (let address of addresses) {
      if (address.id === orders[i].addresses_id) {
        orderRecipient = address.recipient_name;
      }
    }

    let orderProd = "";
    for (let product of products) {
      if (product.prod_id === orders[i].prod_id[0]) {
        orderProd = product.name;
      }
    }

    rows.push(createData(orders[i].id, orderRecipient, orderProd, status));
  }

  useEffect(() => {

    fetch("http://127.0.0.1:8000/shop/view-orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
      body: JSON.stringify({
        batch_id: params.orderId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {

        setOrders(data);
        fetch("http://127.0.0.1:8000/shop/my-addresses/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token,
          },
        })
          .then((response) => response.json())
          .then((data) => {
              
            setAddresses(data);
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
              })
              .catch((err) => {
                console.log("fetchthree", err);
              });
          })
          .catch((err) => {
            console.log("fetchtwo", err);
          });
      })
      .catch((err) => {
        console.log("fetchone", err);
      });
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Mail to</TableCell>
              <TableCell align="right">Item</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.ID}
                </TableCell>
                <TableCell align="right">{row.recipient}</TableCell>
                <TableCell align="right">{row.product}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ViewCustomerOrder;
