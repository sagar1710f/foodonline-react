import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = (props) => {
  const [meals, setmeals] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isError, setisError] = useState();
  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetch(
        "https://react-http-9bb3a-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went Wrong !!!!!");
      }
      const data = await response.json();
      const loadedMeals = [];
      for (const keys in data) {
        loadedMeals.push({
          id: keys,
          ...data[keys],
        });
      }
      setmeals(loadedMeals);
      setisLoading(false);
    };
    fetchMeal().catch((error) => {
      setisError(error.message);
      setisLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealLoading}>
        <p>Loading.....</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={classes.MealError}>
        <p>{isError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
