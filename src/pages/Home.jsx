import React, { useState } from "react";
import Categories from "./../components/Categories";
import Sort from "./../components/Sort";
import PizzaBlock from "./../components/PizzaBlock/index";
import Skeleton from "./../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
const Home = ({ search }) => {
  const [activeCategoryId, setActiveCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [pizzas, setPizzas] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: "популярности (DESC)",
    sortProp: "rating",
  });
  React.useEffect(() => {
    const category = activeCategoryId > 0 ? `category=${activeCategoryId}` : "";
    const sortBy = sortType.sortProp.replace("-", "");
    const order = sortType.sortProp.includes("-") ? "asc" : "desc";
    const searchValue = search ? "&search=" + search : "";

    setIsLoading(true);
    fetch(
      `https://63d3bb81a93a149755b16e08.mockapi.io/Pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchValue}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategoryId, sortType, search, currentPage]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategoryId={activeCategoryId}
          onClickCategory={(id) => setActiveCategoryId(id)}
        />
        <Sort sortType={sortType} onChangeSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((p) => <PizzaBlock key={p.id} {...p} />)}
      </div>
      <Pagination onChangePage={(num) => setCurrentPage(num)} />
    </div>
  );
};
export default Home;
