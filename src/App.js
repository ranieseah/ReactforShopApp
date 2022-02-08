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
          <Header
            cartLength={cart.length}
            name={userInfo.name}
            isAdmin={userInfo.isAdmin}
            setUserInfo={setUserInfo}
            login={false}
          />
          <LandingPage cart={cart} setCart={setCart} />
        </Route>
        <Route path="/login">
          <Header
            cartLength={cart.length}
            name={userInfo.name}
            isAdmin={userInfo.isAdmin}
            setUserInfo={setUserInfo}
            login={true}
          />
          <Login setUserInfo={setUserInfo} />
        </Route>
      </switch>
    </>
  );
}

export default App;
