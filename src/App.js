import React from "react";
import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
function App() {
  const [search, setSearch] = React.useState('');
  const onChangeSearch = (value) => {
    setSearch(value);
  };
  return (
    <div className="wrapper">
      <Header search={search} onChangeSearch={onChangeSearch} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home search={search} />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
