import React from "react";
import s from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import List from "../../Components/List";
import MealItem from "../../Components/Meal-item";
import PopularIngredients from "../../Components/Popular-ingredients";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { latest, popular } = useSelector((state) => state.products);

  const handleMealInfo = (id, title) => {
    navigate(`/meal/${id}/${title}`);
  };

  const handlePopularMeal = (title) => {
    navigate(`/ingredient/${title}`);
  };

  return (
    <section>
      <div className="container">
        <form className={s.home_search}>
          <div>
            <input type="text" />
          </div>
          <div>
            <button type="submit">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>
        <div className={s.meal_item}>
          <h3>Latest Meals</h3>
          <div className={s.meal_item_content}>
            <List
              items={latest && latest}
              renderItem={(elem, i) => {
                return (
                  <MealItem
                    key={i}
                    {...elem}
                    onClick={() => handleMealInfo(elem.idMeal, elem.strMeal)}
                  />
                );
              }}
            />
          </div>
        </div>
        <div className={s.popular}>
          <h3>PopularIngredients</h3>
          <div className={s.popular_ingredients}>
            <List
              items={popular}
              renderItem={(elem, i) => {
                if (i < 4) {
                  return (
                    <PopularIngredients
                      onClick={() => handlePopularMeal(elem.strIngredient)}
                      key={i}
                      {...elem}
                    />
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
