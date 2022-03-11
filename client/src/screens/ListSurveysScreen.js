import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Survey from '../components/Survey'

const ListSurveysScreen = () => {

  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const surveyReducer = useSelector((state) => state.surveyReducer);
  let { loading, surveys } = surveyReducer;
  console.log("survey is here : ",surveyReducer)
  if(user?.type==="company") {
    surveys = surveys?.filter(({ survey }) => survey?.user?._id !== user?._id)
    console.log("ici c paris ",surveys)
  } else {
    console.log("participant || admin")
  }

  const NewHandler = () => {
    navigate('/surveys/-1')
  }
  return (
    <div>
      <div className="mt-5 d-flex flex-row justify-content-between">
        <h3>Surveys</h3>
        <button type="button" className="btn btn-sm btn-primary" onClick={NewHandler}>new</button>
      </div>

      {surveys && (surveys.map((survey) => (
             <div key={survey._id} >
                <Survey survey={survey} />
             </div>
      )))}
    </div>
  )
}

export default ListSurveysScreen
