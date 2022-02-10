import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";

function createData(orderID, status) {
  return { orderID, status };
}

const CustomerOrders = (props) => {
  const history = useHistory();
  const [order, setOrder] = useState([]);

  function createData(orderID, status) {
    return { orderID, status };
  }
  const rows = [];
  for (let i = 0; i < order.length; i++) {
    let status;
    if (order[i].order_status === "PR") {
      status = "Processing Order..";
    } else if (order[i].order_status === "RY") {
      status = "Goods are Ready! Awaiting Pickup";
    } else if (order[i].order_status === "DE") {
      status = "Out for Delivery...";
    } else status = "Complete!";
    rows.push(createData(order[i].batch_id, status));
  }

  const handleOnClick = (e) => {
    console.log(e.target.outerText);
    history.push("/orderslist/" + e.target.outerText);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/shop/view-own-orders-list/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrder(data);
      });
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.orderID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" onClick={handleOnClick}>
                  {row.orderID}
                </TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomerOrders;
