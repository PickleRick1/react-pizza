import React, { useState } from "react";
import Categories from "./../components/Categories";
import Sort from "./../components/Sort";
import PizzaBlock from "./../components/PizzaBlock/index";
import Skeleton from "./../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategoryId } from "../redux/slices/filterSlice";
import axios from "axios";

const Home = () => {
  const { activeCategory, sort } = useSelector((state) => state.filter);
  const sortType = sort.sortProp;
  const dispath = useDispatch();
  const { search } = React.useContext(SearchContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [pizzas, setPizzas] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const onChangeCategory = (id) => {
    dispath(setActiveCategoryId(id));
    console.log(activeCategory);
  };

  React.useEffect(() => {
    const category = activeCategory > 0 ? `category=${activeCategory}` : "";
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const searchValue = search ? "&search=" + search : "";

    setIsLoading(true);
    axios
      .get(
        `https://63d3bb81a93a149755b16e08.mockapi.io/Pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchValue}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategory, sortType, search, currentPage]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategoryId={activeCategory}
          onClickCategory={onChangeCategory}
        />
        <Sort />
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
