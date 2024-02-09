import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../Http/Settings";

const initialState = {
  latest: [],
  infoMeal: [],
  popular: [],
  randomIngredient: [],
};

export const getLatestMeal = createAsyncThunk(
  "latest/getLatestMeal",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const mealNumbers = [
        53083, 53082, 53081, 53080, 53079, 53078, 53077, 53076,
      ];
      const results = await Promise.all(
        mealNumbers.map(async (number) => {
          const result = await instance.get(`/lookup.php?i=${number}`);
          return result.data.meals;
        })
      );
      const combinedMeals = results.flat();
      dispatch(latestMeal(combinedMeals));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getInfoMeal = createAsyncThunk(
  "infoMeal/getInfoMeal",
  async (elem, { rejectWithValue, dispatch }) => {
    try {
      const result = await instance.get(`lookup.php?i=${elem}`);
      dispatch(infoIngredientMeal(result.data.meals));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getPopular = createAsyncThunk(
  "popular/getPopular",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await instance.get("list.php?i=list");
      dispatch(getPopularMeal(res.data.meals));
      dispatch(getRandomIngredients(res.data.meals))
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const mealSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    latestMeal: (state, action) => {
      state.latest = action.payload;
    },
    infoIngredientMeal: (state, action) => {
      state.infoMeal = action.payload;
    },
    getPopularMeal: (state, action) => {
      state.popular = action.payload;
    },
    getRandomIngredients: (state, action) => {
      state.randomIngredient = action.payload;
    },
  },
});

export const {
  latestMeal,
  infoIngredientMeal,
  getPopularMeal,
  getRandomIngredients,
} = mealSlice.actions;

export default mealSlice.reducer;
