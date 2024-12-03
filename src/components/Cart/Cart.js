import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isChecking, setisChecking] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [didSubmit, setdidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasOrder = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setisChecking(true);
  };

  const orderSubmitHandler = (userData) => {
    setisSubmitting(true);
    fetch("https://react-http-9bb3a-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userInfo: userData,
        orderItems: cartCtx.items,
      }),
    });
    setisSubmitting(false);
    setdidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            id={item.id}
            amount={item.amount}
            price={item.price}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  const ModalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasOrder && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const ModalContext = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isChecking && (
        <Checkout onCancel={props.onCloseCart} onOrder={orderSubmitHandler} />
      )}
      {!isChecking && ModalActions}
    </React.Fragment>
  );

  const ModalSubmitting = <p>Submitting Order.....</p>;
  const ModalSubmitted = (
    <React.Fragment>
      <p>Order Submitted Successfully.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClick={props.onCloseCart}>
      {!isSubmitting && !didSubmit && ModalContext}
      {isSubmitting && ModalSubmitting}
      {!isSubmitting && didSubmit && ModalSubmitted}
    </Modal>
  );
};
export default Cart;
