import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSort } from "../redux/slices/filter/selectors";
import { setSortType } from "../redux/slices/filter/slice";
import {
  SortObj,
  SortTypes,
} from "../redux/slices/filter/types";

export const typeSort: SortObj[] = [
  { name: "популярности (DESC)", sortProp: SortTypes.RATING_DESC },
  { name: "популярности (ASC)", sortProp: SortTypes.RATING_ASC },
  { name: "цене (DESC)", sortProp: SortTypes.PRICE_DESC },
  { name: "цене (ASC)", sortProp: SortTypes.PRICE_ASC },
  { name: "алфавиту (DESC)", sortProp: SortTypes.TITLE_DESC },
  { name: "алфавиту (ASC)", sortProp: SortTypes.TITLE_ASC },
];

const Sort: React.FC = React.memo(() => {
  const sort = useSelector(selectSort);
  const [activeSort, setActiveSort] = React.useState(false);
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);
  const onClickSort = (t: SortObj) => {
    dispatch(setSortType(t));
    setActiveSort(false);
  };

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[];
        composedPath: (tar?: HTMLElement) => EventTarget[];
        target: HTMLElement;
      };
      let path = _event.path || (_event.composedPath && _event.composedPath());
      if (sortRef.current && !path.includes(sortRef.current)) {
        setActiveSort(false);
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, []);
  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setActiveSort(!activeSort)}>{sort.name}</span>
      </div>
      {activeSort && (
        <div className="sort__popup">
          <ul>
            {typeSort.map((t, i) => (
              <li
                onClick={() => onClickSort(t)}
                className={t.name === sort.name ? "active" : ""}
                key={i}
              >
                {t.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
export default Sort;
