import React, {useEffect} from 'react';
import Home from '../Home';
import {Route, Routes} from 'react-router-dom';
import { getLatestMeal, getPopular } from '../../Redux-toolkit/MealSlice/MealSlice';
import { useDispatch } from 'react-redux';
import InfoIngredient from '../../Components/Info-ingredient';

const Main = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLatestMeal())
    dispatch(getPopular())
  })
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/meal/:idMeal/:title' element={<InfoIngredient/>}/>
        </Routes>
    </div>
  )
}

export default Main
