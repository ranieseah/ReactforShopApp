import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router";

const Address = (props) => {
  const history = useHistory();
  const handleEdit = () => {
    props.setEditMode(true);
    props.setNewRecipient(props.addresses[props.i].recipient_name);
    props.setNewAddress(props.addresses[props.i].address);
    props.setEditId(props.addresses[props.i].id);
  };

  const handleDelete = () => {
    fetch("http://127.0.0.1:8000/shop/del-address/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
      body: JSON.stringify({
        id: props.addresses[props.i].id,
        is_active: "False",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "OK") {
          props.setRefetch((prevState) => {
            return prevState + 1;
          });
        }
      })
      .catch(() => {
        history.push("/login");
      });
  };

  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            <IconButton edge="end" aria-label="delete" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
              <DeleteOutlineIcon />
            </IconButton>
          </>
        }
      >
        <ListItemText
          primary={props.addresses[props.i].recipient_name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {props.addresses[props.i].address}
              </Typography>
              {}
            </React.Fragment>
          }
        />
      </ListItem>

      <Divider variant="inset" component="li" />
    </>
  );
};

export default Address;
