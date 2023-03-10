import React, { useRef } from "react";
import qs from "qs";
import Categories from "./../components/Categories";
import Sort, { typeSort } from "./../components/Sort";
import PizzaBlock from "./../components/PizzaBlock/index";
import Skeleton from "./../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import {
  setActiveCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filter/slice";

import { useNavigate } from "react-router-dom";
import { fetchPizzas } from "../redux/slices/pizza/slice";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/slices/filter/selectors";
import { selectPizza } from "../redux/slices/pizza/selectors";

const Home: React.FC = () => {
  const isSearch = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);
  const navigate = useNavigate();
  const { activeCategory, sort, currentPage, search } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);
  const sortType = sort.sortProp;
  const dispatch = useAppDispatch();

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setActiveCategoryId(id));
  }, []);
  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num));
  };
  const getPizzas = () => {
    const category = activeCategory > 0 ? `category=${activeCategory}` : "";
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const searchValue = search ? "&search=" + search : "";
    dispatch(
      fetchPizzas({
        category,
        sortBy,
        order,
        searchValue,
        currentPage: String(currentPage),
      })
    );
  };
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = typeSort.find((t) => t.sortProp === params.sortType);

      dispatch(
        setFilters({
          search: params.search ? String(params.search) : "",
          activeCategory: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || typeSort[0],
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
      <h2 className="content__title">?????? ??????????</h2>
      {status === "error" ? (
        <div className="content__error">
          <h2>
            ?????????????????? ???????????? <span>????</span>
          </h2>
          <p>
            ?????????????????? ??????????, ?????????????????? ???????????? ???? ??????????????
            <br />
            ????????????????????, ???????????????????? ??????????.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
            : items.map((p) => <PizzaBlock key={p.id} {...p} />)}
        </div>
      )}
      {status === "error" ? (
        ""
      ) : (
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      )}
    </div>
  );
};
export default Home;
