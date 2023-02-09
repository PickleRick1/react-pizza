import React from "react";

type CategoriesProps = {
  activeCategoryId: number;
  onClickCategory: (id: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({
  activeCategoryId,
  onClickCategory,
}) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((c, i) => (
          <li
            key={i}
            onClick={() => {
              onClickCategory(i);
            }}
            className={i === activeCategoryId ? "active" : ""}
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
