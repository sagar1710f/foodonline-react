import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isValidCode = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const [formInputIsValid, setformInputIsValid] = useState({
    name: true,
    street: true,
    postalcode: true,
    city: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isValidCode(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setformInputIsValid({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalcode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredPostalCodeIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }
    props.onOrder({
      name: enteredName,
      street: enteredStreet,
      postalcode: enteredPostalCode,
      city: enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputIsValid.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputIsValid.name && <p>Enter a valid Name</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputIsValid.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputIsValid.street && <p>Enter a valid Street</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputIsValid.postalcode ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputIsValid.postalcode && <p>Enter a valid Postal Code.</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputIsValid.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputIsValid.city && <p>Enter a valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
