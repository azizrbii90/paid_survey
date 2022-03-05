import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listSurveys } from "../actions/surveyActions";


const HomeScreen = () => {

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(listSurveys())
   }, []);

  return (
    <div>
        <h1 className="mt-4"> THIS HOME SCREEN </h1>
    </div>
  )
}

export default HomeScreen
