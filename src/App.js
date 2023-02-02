import React from "react";
import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
export const SearchContext = React.createContext();
function App() {
  const [search, setSearch] = React.useState("");
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ search, setSearch }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
