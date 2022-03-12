import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Response from '../components/Response'

const SurveyReplyScreen = () => {

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({})
  const { id } = useParams();
  const surveyReducer = useSelector((state) => state.surveyReducer);
  let { loading, surveys } = surveyReducer;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;

  useEffect(() => {
   
      for(let i=0; i < surveys.length; i++) {

        if(surveys[i]?._id===id) {
          let surveyUpdate = Object.assign({}, surveys[i])
          surveyUpdate.user = surveys[i]?.user?._id
          setFormData(surveyUpdate);
          break
        }
      }
    
  },[id,user,surveys])

  useEffect(() => {
    
      for(let i=0; i < surveys.length; i++) {
        if(surveys[i]?._id===id) {
          let surveyUpdate = Object.assign({}, surveys[i])
          surveyUpdate.user = surveys[i]?.user?._id
          setFormData(surveyUpdate);
          break
        }
      }
    
  },[])

  const handleResponses = (responses)=> {
   let newResponse = { response : []}
   if(formData.responses.length>0)
    newResponse = formData.responses[formData.responses.length-1]
   let responsesStep = { responses : responses }
   newResponse.response[step] = responsesStep
   let newFormDataResponses = formData.responses
   if(newFormDataResponses.length>0)
    newFormDataResponses[newFormDataResponses.length-1] = newResponse
   else newFormDataResponses[newFormDataResponses.length] = newResponse
  
   //updating for data state taking previous state and then adding new value to create new object
   setFormData(prevState => ({
     ...prevState,
     responses: newFormDataResponses
    }));
  }

  const nextStep = () => {
    setStep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setStep(step - 1);
  };

  for (let i=0;  i <= step; i++ ) {
    if(i===step){
      return (
      <div key={step}>
        <Response step={step} nextStep={nextStep} prevStep={prevStep} handleFormData={handleResponses} values={formData}/>
      </div>
      )
    }
  }
}

export default SurveyReplyScreen
