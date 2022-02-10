import React, { useState } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import Login from "./components/Login";
import AdminLanding from "./components/AdminLanding";
import AddProd from "./components/AddProd";
import EditProd from "./components/EditProd";
import Cart from "./components/Cart";
import CustomerOrders from "./components/CustomerOrders";
import ViewCustomerOrder from "./components/ViewCustomerOrder";
import ProductOrders from "./components/ProductOrders";
import AllOrders from "./components/AllOrders";
import Summary from "./components/Summary";

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
          />{" "}
          <Cart userInfo={userInfo} cart={cart} setCart={setCart} />
        </Route>
        <Route exact path="/orders">
          <Header
            cartLength={cart.length}
            name={userInfo.name}
            isAdmin={userInfo.isAdmin}
            setUserInfo={setUserInfo}
            login={false}
          />
          <CustomerOrders token={userInfo.token} />
        </Route>
        <Route path="/orderslist/:orderId">
          <Header
            cartLength={cart.length}
            name={userInfo.name}
            isAdmin={userInfo.isAdmin}
            setUserInfo={setUserInfo}
            login={false}
          />
          <ViewCustomerOrder token={userInfo.token} />
        </Route>
        <Route path="/summary">
          <Header
            cartLength={cart.length}
            name={userInfo.name}
            isAdmin={userInfo.isAdmin}
            setUserInfo={setUserInfo}
            login={false}
          />
          <Summary token={userInfo.token} />
        </Route>
        <Route exact path="/allorders">
          <Header
            cartLength={cart.length}
            name={userInfo.name}
            isAdmin={userInfo.isAdmin}
            setUserInfo={setUserInfo}
            login={false}
          />
          <AllOrders token={userInfo.token} />
        </Route>
        <Route exact path="/productorders">
          <Header
            cartLength={cart.length}
            name={userInfo.name}
            isAdmin={userInfo.isAdmin}
            setUserInfo={setUserInfo}
            login={false}
          />
          <ProductOrders token={userInfo.token} />
        </Route>
      </switch>
    </>
  );
}

export default App;
