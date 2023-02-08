import React from "react";
import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/pizza/:id" element={<FullPizza />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;