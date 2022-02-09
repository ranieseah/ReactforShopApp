import React, { useEffect } from "react";
import { useState } from "react";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router-dom";

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

const Login = (props) => {
  const [eerror, setEerror] = useState("");
  const [perror, setPerror] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nerror, setNerror] = useState("");
  const [serror, setSerror] = useState("");
  const [neerror, setNEerror] = useState("");
  const [nperror, setNPerror] = useState("");
  const [rperror, setRPerror] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rpassword, setRPassword] = useState("");
  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleNEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleNPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleRPasswordChange = (e) => {
    setRPassword(e.target.value);
  };

  const handleLogin = () => {
    if (email === "") {
      setEerror("Required");
    }
    if (password === "") {
      setPerror("Required");
    }
    if (email !== "") {
      setEerror("");
    }
    if (password !== "") {
      setPerror("");
    }
    if (password !== "" && email !== "") {
      fetch("http://127.0.0.1:8000/shop/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.msg === "OK") {
            fetch("http://127.0.0.1:8000/shop/user-token/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: email, password: password }),
            })
              .then((response) => response.json())
              .then((data) => {
                props.setUserInfo({
                  token: data.access,
                });
                fetch("http://127.0.0.1:8000/shop/user/", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: email }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    props.setUserInfo((prevState) => {
                      return {
                        ...prevState,
                        name: data.name,
                        isAdmin: data.is_admin,
                        id: data.id,
                      };
                    });
                    if (data.is_admin === true) {
                      history.push("/admin");
                    } else {
                      history.push("/");
                    }
                  });
              });
          } else {
            setEerror("Please check Email.");
            setPerror("Please check Password.");
          }
        });
    }
  };

  const handleSubmit = () => {
    if (name === "") {
      setNerror("Required");
    } else {
      setNerror("");
    }
    if (surname === "") {
      setSerror("Required");
    } else {
      setSerror("");
    }
    if (newEmail === "") {
      setNEerror("Required");
    } else {
      if (newEmail.includes("@")) {
        setNEerror("");
      } else {
        setNEerror("Please enter valid email.");
      }
    }
    if (newPassword === "") {
      setNPerror("Required");
    } else {
      setNPerror("");
    }
    if (rpassword === "") {
      setRPerror("Required");
    } else {
      if (newPassword !== rpassword) {
        setRPerror("Passwords don't match!");
        setNPerror("Passwords don't match!");
      } else {
        setRPerror("");
      }
    }
    if (
      nerror === "" &&
      serror === "" &&
      neerror === "" &&
      nperror === "" &&
      rperror === ""
    ) {
      fetch("http://127.0.0.1:8000/shop/add-user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newEmail,
          password: newPassword,
          name: name,
          surname: surname,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.msg === "OK") {
            fetch("http://127.0.0.1:8000/shop/user-token/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: newEmail, password: newPassword }),
            })
              .then((response) => response.json())
              .then((data) => {
                props.setUserInfo({
                  token: data.access,
                });
                fetch("http://127.0.0.1:8000/shop/user/", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: newEmail }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    props.setUserInfo((prevState) => {
                      return {
                        ...prevState,
                        name: data.name,
                        isAdmin: data.is_admin,
                        id: data.id,
                      };
                    });
                    history.push("/");
                  });
              });
          }
        })
        .catch(() => {
          setNEerror("Seems like you already have an account! Please login..");
        });
    }
  };

  useEffect(() => {
    props.setUserInfo({
      name: "",
      token: "",
      isAdmin: false,
    });
  }, []);

  return (
    <Container maxWidth="sm">
      <TabsUnstyled defaultValue={0}>
        <TabsList>
          <Tab>Login</Tab>
          <Tab>SignUp</Tab>
        </TabsList>
        <TabPanel value={0}>
          <Stack spacing={6}>
            {eerror === "" && (
              <TextField
                id="outlined-helperText"
                label="Email"
                helperText={eerror}
                value={email}
                onChange={handleEmailChange}
              />
            )}
            {eerror !== "" && (
              <TextField
                error
                id="outlined-helperText"
                label="Email"
                helperText={eerror}
                value={email}
                onChange={handleEmailChange}
              />
            )}
            {perror === "" && (
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                helperText={perror}
                value={password}
                onChange={handlePasswordChange}
              />
            )}
            {perror !== "" && (
              <TextField
                error
                id="outlined-password-input"
                label="Password"
                type="password"
                helperText={perror}
                value={password}
                onChange={handlePasswordChange}
              />
            )}
            <Button variant="contained" size="large" onClick={handleLogin}>
              Login
            </Button>
          </Stack>
        </TabPanel>
        <TabPanel value={1}>
          <Stack spacing={6}>
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
            {serror === "" && (
              <TextField
                id="outlined-helperText"
                label="Surname"
                helperText={serror}
                value={surname}
                onChange={handleSurnameChange}
              />
            )}
            {serror !== "" && (
              <TextField
                error
                id="outlined-helperText"
                label="Surname"
                helperText={serror}
                value={surname}
                onChange={handleSurnameChange}
              />
            )}

            {neerror === "" && (
              <TextField
                id="outlined-helperText"
                label="Email"
                helperText={neerror}
                value={newEmail}
                onChange={handleNEmailChange}
              />
            )}
            {neerror !== "" && (
              <TextField
                error
                id="outlined-helperText"
                label="Email"
                helperText={neerror}
                value={newEmail}
                onChange={handleNEmailChange}
              />
            )}
            {nperror === "" && (
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                helperText={nperror}
                value={newPassword}
                onChange={handleNPasswordChange}
              />
            )}
            {nperror !== "" && (
              <TextField
                error
                id="outlined-password-input"
                label="Password"
                type="password"
                helperText={nperror}
                value={newPassword}
                onChange={handleNPasswordChange}
              />
            )}
            {rperror === "" && (
              <TextField
                id="outlined-password-input"
                label="Retype Password"
                type="password"
                helperText={rperror}
                value={rpassword}
                onChange={handleRPasswordChange}
              />
            )}
            {rperror !== "" && (
              <TextField
                error
                id="outlined-password-input"
                label="Retype Password"
                type="password"
                helperText={rperror}
                value={rpassword}
                onChange={handleRPasswordChange}
              />
            )}
            <Button variant="contained" size="large" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </TabPanel>
      </TabsUnstyled>
    </Container>
  );
};

export default Login;
