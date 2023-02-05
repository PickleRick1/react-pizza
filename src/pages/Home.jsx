import React, { useRef, useState } from "react";
import qs from "qs";
import Categories from "./../components/Categories";
import Sort, { typeSort } from "./../components/Sort";
import PizzaBlock from "./../components/PizzaBlock/index";
import Skeleton from "./../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const navigate = useNavigate();
  const { activeCategory, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const sortType = sort.sortProp;
  const dispatch = useDispatch();
  const { search } = React.useContext(SearchContext);
  const [isLoading, setIsLoading] = React.useState(true);
  const [pizzas, setPizzas] = React.useState([]);

  const onChangeCategory = (id) => {
    dispatch(setActiveCategoryId(id));
  };
  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };
  const getPizzas = () => {
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
  };
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = typeSort.find((t) => t.sortProp === params.sortType);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [activeCategory, sortType, search, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activeCategory,
        sortType,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategory, sortType, currentPage]);

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
          ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((p) => <PizzaBlock key={p.id} {...p} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
