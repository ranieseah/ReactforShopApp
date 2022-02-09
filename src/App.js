import React, { useState } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import Login from "./components/Login";
import AdminLanding from "./components/AdminLanding";
import AddProd from "./components/AddProd";
import EditProd from "./components/EditProd";
import Cart from "./components/Cart";

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
        <Route path="/admin">
          <Header
            cartLength={cart.length}
            name={userInfo.name}
            isAdmin={userInfo.isAdmin}
            setUserInfo={setUserInfo}
            login={false}
          />
          <AdminLanding cart={cart} setCart={setCart} />
        </Route>
        <Route path="/new-prod">
          <Header
            cartLength={cart.length}
            name={userInfo.name}
            isAdmin={userInfo.isAdmin}
            setUserInfo={setUserInfo}
            login={false}
          />
          <AddProd token={userInfo.token} />
        </Route>
        <Route path="/edit/:prodId">
          <Header
            cartLength={cart.length}
            name={userInfo.name}
            isAdmin={userInfo.isAdmin}
            setUserInfo={setUserInfo}
            login={false}
          />
          <EditProd token={userInfo.token} />
        </Route>
        <Route path="/cart">
          <Header
            cartLength={cart.length}
            name={userInfo.name}
            isAdmin={userInfo.isAdmin}
            setUserInfo={setUserInfo}
            login={false}
          />
          <Cart userInfo={userInfo} cart={cart} setCart={setCart} />
        </Route>
      </switch>
    </>
  );
}

export default App;
