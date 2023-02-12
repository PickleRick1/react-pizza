import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
  const params = useParams();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    desrc: string;
    price: number;
  }>();
  React.useEffect(() => {
    async function loadPizzas() {
      try {
        const { data } = await axios.get(
          `https://63d3bb81a93a149755b16e08.mockapi.io/Pizzas/` + params.id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при загрзке!");
      }
    }
    loadPizzas();
  }, []);

  if (!pizza) {
    return <div className="container">Загрзка ...</div>;
  }
  return (
    <div className="container container--pizza">
      <div className="pizza">
        <div className="pizza__img">
          <img src={pizza.imageUrl} alt="Pizza" />
        </div>
        <div className="pizza__title">
          <h2>{pizza.title}</h2>
        </div>
        <div className="pizza__desrc">
          <p>{pizza.desrc}</p>
        </div>
        <div className="pizza__price">
          <p>{pizza.price} ₽</p>
        </div>
      </div>
      <div className="cart__bottom-buttons">
        <Link to="/" className="button button--outline button--add go-back-btn">
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 13L1 6.93015L6.86175 1"
              stroke="#D3D3D3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};
export default FullPizza;
