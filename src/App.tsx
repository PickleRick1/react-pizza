import React from "react";
import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

const Cart = React.lazy(() => import("./pages/Cart"));
const FullPizza = React.lazy(() => import("./pages/FullPizza"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <React.Suspense
          fallback={<div className="container">Идет загрузка...</div>}
        >
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/pizza/:id" element={<FullPizza />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
