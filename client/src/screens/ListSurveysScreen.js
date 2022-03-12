import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Survey from '../components/Survey'


const ListSurveysScreen = () => {

  const [surveysUI,setSurveysUI] = useState([])
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin);
  let { user } = userLogin;
  const surveyReducer = useSelector((state) => state.surveyReducer);
  let { loading, surveys } = surveyReducer;

  useEffect(() => {
    var newSurveys = []
    if(user?.type==="company") {
        newSurveys = surveys?.filter(function (el) {
         return el?.user?._id === user?._id
      })
    } else {
      console.log("participant || admin")
      if(user?.type==="participant") {
        newSurveys = surveys?.filter(function (el) {
          return containsObject(user,el?.participants) === false
        })
      }
    }
    setSurveysUI(newSurveys);
  },[user,surveys])

  useEffect(() => {
    if(user?.type==="company") {
      var newSurveys = surveys?.filter(function (el) {
        return el?.user?._id === user?._id
      })
      setSurveysUI(newSurveys);
    } else {
      console.log("participant || admin")
      if(user?.type==="participant") {
        newSurveys = surveys?.filter(function (el) {
          return containsObject(user,el?.participants) === false
        })
      }
    }
    setSurveysUI(newSurveys);
  },[])

  const containsObject = (obj, list) => {
    var i;
    for (i = 0; i < list?.length; i++) {
        if (list[i]?._id === obj?._id) {
            return true;
        }
    }
    return false;
  }
  

  const NewHandler = () => {
    navigate('/surveys/-1')
  }
  return (
    <div>
      <div className="mt-5 d-flex flex-row justify-content-between">
        <h3>Surveys</h3>
        {user?.type === 'company' && (
          <button type="button" className="btn btn-sm btn-primary" onClick={NewHandler}>new</button>
        )}
      </div>

      {surveysUI && (surveysUI.map((survey) => (
             <div key={survey._id} >
                <Survey survey={survey} />
             </div>
      )))}
    </div>
  )
}

export default ListSurveysScreen
