import { useState } from "react";
import * as React from "react";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useHistory } from "react-router";
import Address from "./Address";

const StepTwo = (props) => {
  const history = useHistory();
  const [newRecipient, setNewRecipient] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [aerror, setAerror] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleRecipientChange = (e) => {
    setNewRecipient(e.target.value);
  };

  const handleAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleAdd = () => {
    if (newAddress === "") {
      setAerror("Required");
    } else {
      setAerror("");
    }
    if (aerror === "") {
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
            props.setRefetch((prevState) => {
              return prevState + 1;
            });
            setNewRecipient("");
            setNewAddress("");
          }
        })
        .catch(() => {
          history.push("/login");
        });
    }
  };

  const handleSubmit = () => {
    if (newAddress === "") {
      setAerror("Required");
    } else {
      setAerror("");
    }
    if (aerror === "") {
      fetch("http://127.0.0.1:8000/shop/update-address/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.userInfo.token,
        },
        body: JSON.stringify({
          recipient_name: newRecipient,
          address: newAddress,
          id: editId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.msg === "OK") {
            props.setRefetch((prevState) => {
              return prevState + 1;
            });
            setNewRecipient("");
            setNewAddress("");
            setEditMode(false);
            setEditId(null);
          }
        })
        .catch(() => {
          history.push("/login");
        });
    }
  };

  const stepTwo = [];
  for (let i = 0; i < props.addresses.length; i++) {
    if (props.addresses[i].id !== editId) {
      stepTwo.push(
        <Address
          addresses={props.addresses}
          i={i}
          setNewRecipient={setNewRecipient}
          setNewAddress={setNewAddress}
          setEditMode={setEditMode}
          setEditId={setEditId}
          token={props.userInfo.token}
          setRefetch={props.setRefetch}
        />
      );
    }
  }

  return (
    <>
      {props.activeStep === 1 && (
        <>
          <Container maxWidth="md">
            <Stack spacing={2}>
              <Container maxWidth="100%">
                <Stack direction="row" spacing={2}>
                  {editMode && (
                    <Typography variant="h4" component="div" gutterBottom>
                      Edit Address
                    </Typography>
                  )}
                  <TextField
                    id="outlined-helperText"
                    label="Recipient"
                    value={newRecipient}
                    onChange={handleRecipientChange}
                  />
                  <TextField
                    id="outlined-helperText"
                    label="Address"
                    helperText={aerror}
                    value={newAddress}
                    multiline
                    maxRows={2}
                    onChange={handleAddressChange}
                  />
                  {editMode === false && (
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleAdd}
                    >
                      Add
                    </Button>
                  )}
                  {editMode && (
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleSubmit}
                    >
                      Edit
                    </Button>
                  )}
                </Stack>
              </Container>
              <Container maxWidth="md">
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 1200,
                    bgcolor: "background.paper",
                  }}
                >
                  {stepTwo}
                </List>
              </Container>
            </Stack>
          </Container>
        </>
      )}
    </>
  );
};

export default StepTwo;
