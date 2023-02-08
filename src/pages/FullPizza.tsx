import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

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
    </div>
  );
};
export default FullPizza;
