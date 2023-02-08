import debounce from "lodash.debounce";
import React from "react";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";
import styles from "./Search.module.scss";
const Search = () => {
  const [value, setValue] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
      inputRef.current?.focus();
  };
  const updateSearchRequest = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 300),
    []
  );
  const onChangeValueSearch = (e: any) => {
    setValue(e.target.value);
    updateSearchRequest(e.target.value);
  };
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="#000000"
      >
        <circle cx="28" cy="28" r="20" />
        <line x1="56" y1="56" x2="42.14" y2="42.14" />
      </svg>
      <input
        ref={inputRef}
        onChange={onChangeValueSearch}
        value={value}
        type="text"
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.icon_close}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
            fill="#0F1729"
          />
        </svg>
      )}
    </div>
  );
};
export default Search;
