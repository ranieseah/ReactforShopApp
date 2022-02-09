import { React, useState } from "react";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const AddProd = (props) => {
  const [prodId, setProdId] = useState("");
  const [pierror, setPIerror] = useState("");
  const [name, setName] = useState("");
  const [nerror, setNerror] = useState("");
  const [price, setPrice] = useState(0);
  const [perror, setPerror] = useState("");
  const [description, setDescription] = useState("");
  const [derror, setDerror] = useState("");
  const [qty, setQty] = useState(0);
  const [qerror, setQerror] = useState("");
  const [image, setImage] = useState("");
  const [ierror, setIerror] = useState("");
  const history = useHistory();

  const handleProdIdChange = (e) => {
    setProdId(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleQtyChange = (e) => {
    setQty(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleAdd = () => {
    if (prodId === "") {
      setPIerror("Required");
    } else if (prodId.length < 10 || prodId.length > 20) {
      setPIerror("Prod_ID should have between 10 - 20 characters.");
    } else {
      setPIerror("");
    }
    if (name === "") {
      setNerror("Required");
    } else {
      setNerror("");
    }
    if (price === 0 || price.length === 0) {
      setPerror("Required");
    } else if (isNaN(price)) {
      setPerror("Please input a number.");
    } else if (price.includes(".")) {
      setPerror("Please input a whole number.");
    } else if (price > 1000) {
      setPerror("Not sure that's realistic, bro");
    } else {
      setPerror("");
    }
    if (description.length === 0) {
      setDerror(
        "You sure you don't want to use this area to market your product abit?"
      );
    } else {
      setDerror("");
    }
    if (qty === 0 || qty.length === 0) {
      setQerror("Required");
    } else if (isNaN(qty)) {
      setQerror("Please input a number.");
    } else if (qty.includes(".")) {
      setQerror("You sure you have stocks for a portion of a bottle?");
    } else if (qty > 10000) {
      setQerror("Not sure that's realistic, bro");
    } else {
      setQerror("");
    }
    if (image.length === 0) {
      setIerror("Required");
    } else if (image.length > 255) {
      setIerror(
        "Sorry, can you provide another link that's shorter than 255 characters?"
      );
    } else {
      setIerror("");
    }
    if (
      pierror === "" &&
      nerror === "" &&
      perror === "" &&
      qerror === "" &&
      ierror === ""
    ) {
      fetch("http://127.0.0.1:8000/shop/add-product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + props.token,
        },
        body: JSON.stringify({
          prod_id: prodId,
          name: name,
          price: price,
          description: description,
          qty: qty,
          image: image,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.msg === 'OK') {
            history.push("/admin")
          }
          console.log(data)
        }).catch(()=> {
          setPIerror("This Prod_ID has already been registered!")
        });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="div" gutterBottom>
        Add New Product
      </Typography>
      <Stack spacing={2}>
        {pierror === "" && (
          <TextField
            id="outlined-helperText"
            label="Product Id"
            helperText={pierror}
            value={prodId}
            onChange={handleProdIdChange}
          />
        )}
        {pierror !== "" && (
          <TextField
            error
            id="outlined-helperText"
            label="Product Id"
            helperText={pierror}
            value={prodId}
            onChange={handleProdIdChange}
          />
        )}
        {nerror === "" && (
          <TextField
            id="outlined-helperText"
            label="Name"
            helperText={nerror}
            value={name}
            onChange={handleNameChange}
          />
        )}
        {nerror !== "" && (
          <TextField
            error
            id="outlined-helperText"
            label="Name"
            helperText={nerror}
            value={name}
            onChange={handleNameChange}
          />
        )}
        {perror === "" && (
          <TextField
            id="outlined-helperText"
            label="Price"
            helperText={perror}
            value={price}
            onChange={handlePriceChange}
          />
        )}
        {perror !== "" && (
          <TextField
            error
            id="outlined-helperText"
            label="Price"
            helperText={perror}
            value={price}
            onChange={handlePriceChange}
          />
        )}
        {derror === "" && (
          <TextField
            id="outlined-helperText"
            label="Description"
            helperText={derror}
            value={description}
            multiline
            rows={4}
            onChange={handleDescriptionChange}
          />
        )}
        {derror !== "" && (
          <TextField
            color="info"
            id="outlined-helperText"
            label="Description"
            helperText={derror}
            value={description}
            multiline
            rows={4}
            onChange={handleDescriptionChange}
          />
        )}
        {qerror === "" && (
          <TextField
            id="outlined-helperText"
            label="Qty"
            helperText={qerror}
            value={qty}
            onChange={handleQtyChange}
          />
        )}
        {qerror !== "" && (
          <TextField
            error
            id="outlined-helperText"
            label="Qty"
            helperText={qerror}
            value={qty}
            onChange={handleQtyChange}
          />
        )}
        {ierror === "" && (
          <TextField
            id="outlined-helperText"
            label="Image"
            helperText={ierror}
            value={image}
            onChange={handleImageChange}
          />
        )}
        {ierror !== "" && (
          <TextField
            error
            id="outlined-helperText"
            label="Image"
            helperText={ierror}
            value={image}
            onChange={handleImageChange}
          />
        )}
        <Button variant="contained" size="large" onClick={handleAdd}>
          List it!
        </Button>
      </Stack>
    </Container>
  );
};

export default AddProd;
