import React from "react";
import { Link } from "react-router-dom";
import imgEmpty from "./../assets/img/empty-cart.png";
const CartEmpty: React.FC = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>
          Корзина пустая.
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <div className="cart__img">
          <img src={imgEmpty} alt="Empty cart" />
        </div>
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};
export default CartEmpty;
