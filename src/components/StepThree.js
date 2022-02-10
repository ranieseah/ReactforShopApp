import { React } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container, Stack } from "@mui/material";

const StepThree = (props) => {
  const addressList = [<MenuItem value="undefined"></MenuItem>];
  for (let i = 0; i < props.addresses.length; i++) {
    addressList.push(
      <MenuItem value={props.addresses[i].id}>
        {props.addresses[i].recipient_name}
      </MenuItem>
    );
  }

  const itemList = [<MenuItem value="undefined"></MenuItem>];
  for (let i = 0; i < props.cart.length; i++) {
    itemList.push(
      <MenuItem value={props.cart[i].prod_id}>
        #{i + 1} - {props.cart[i].name}
      </MenuItem>
    );
  }

  const forms = [];
  for (let i = 0; i < props.cart.length; i++) {
    const handleChange = (event) => {
      props.setAddressId((prevState) => {
        return { ...prevState, [i]: event.target.value };
      });
    };
    const handleItemListChange = (event) => {
      props.setProductId((prevState) => {
        return { ...prevState, [i]: event.target.value };
      });
    };

    forms.push(
      <>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Recipient #{i + 1}
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={props.addressId[i]}
            label="Address"
            onChange={handleChange}
          >
            {addressList}
          </Select>
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Product #{i + 1}
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={props.productId[i]}
            label="Product"
            onChange={handleItemListChange}
            displayEmpty
          >
            {itemList}
          </Select>
          <FormHelperText></FormHelperText>
        </FormControl>
      </>
    );
  }

  return (
    <Container maxWidth="md">
      <Stack spacing={10}>
        <Container maxWidth="md">
          <Stack spacing={1}>{forms}</Stack>
        </Container>
      </Stack>
    </Container>
  );
};
export default StepThree;
