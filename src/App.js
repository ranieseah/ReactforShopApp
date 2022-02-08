import React, { useState } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import Login from "./components/Login";

function App() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    token: "",
    isAdmin: false,
  });
  const [cart, setCart] = useState([]);

  return (
    <>
      <switch>
        <Route exact path="/">
          <Header cartLength={cart.length} />
          <LandingPage cart={cart} setCart={setCart} />
        </Route>
        <Route path="/login">
          <Header cartLength={cart.length} />
          <Login />
        </Route>
      </switch>
    </>
  );
}

export default App;
