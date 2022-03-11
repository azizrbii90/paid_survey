import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import StepOne from "./SurveyForm/StepOne";
import StepTwo from "./SurveyForm/StepTwo";
import Final from "./SurveyForm/Final";


const SurveyScreen = (s) => {
  const [step, setStep] = useState(1);
  const { id } = useParams();
  const domainReducer = useSelector((state) => state.domainReducer);
  let { isLoading, domains } = domainReducer;
  const surveyReducer = useSelector((state) => state.surveyReducer);
  let { loading, surveys } = surveyReducer;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const [formData, setFormData] = useState({
    title: "",
    user: user?._id,
    countries: [],
    domains: [],
    questions: [],
    minResponses: 3,
    closed: false, 
    uploadedRequest: false, 
    isVerified: false,  
    price: 10
  })

  useEffect(() => {
    if(id!=='-1') {
      for(let i=0; i < surveys.length; i++) {
        if(surveys[i]?._id===id) {
          let surveyUpdate = Object.assign({}, surveys[i])
          surveyUpdate.user = surveys[i]?.user?._id
          let d = surveys[i]?.domains.map(d => d?.title)
          surveyUpdate.domains = []
          surveyUpdate.domains = d
          setFormData(surveyUpdate);
          break
        }
      }
    }
  },[domains,id,user,surveys])

  useEffect(() => {
    if(id!==-1) {
      for(let i=0; i < surveys.length; i++) {
        if(surveys[i]?._id===id) {
          let surveyUpdate = Object.assign({}, surveys[i])
          surveyUpdate.user = surveys[i]?.user?._id
          let d = surveys[i]?.domains.map(d => d?.title)
          surveyUpdate.domains = []
          surveyUpdate.domains = d
          setFormData(surveyUpdate);
          break
        }
      }
    }
  },[])

  

  const handleInputData = input => e => {
    // input value from the form
    let value;
    if([input][0]==='closed' || [input][0]==='uploadedRequest') {
      console.log("here")
      value = e.target.checked
    } else {
      value = e.target.value
    }
    
    //updating for data state taking previous state and then adding new value to create new object
    setFormData(prevState => ({
      ...prevState,
      [input]: value
  }));
  }
  const handleInputTables = (countries,domains,questions)=> {
     
     let q = formData.questions
     let newQuestions = q
     newQuestions[step-3]=questions;


    //updating for data state taking previous state and then adding new value to create new object
    setFormData(prevState => ({
      ...prevState,
      countries: countries,
      domains: domains, 
      questions: newQuestions
  }));
  }

   const nextStep = () => {
    setStep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setStep(step - 1);
  };

  
  
  for (let i=1;  i <= step; i++ ) {
    if(i === 1 && step ===1) {
      return (
        <div>
          
                <StepOne nextStep={nextStep} handleFormData={handleInputData} handleFormTables={handleInputTables} values={formData} />
            
        </div>
      );

    } if ( i === 2 && step ===2 ) {
      return (
        <div>
         
                <StepTwo nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} handleFormTables={handleInputTables} values={formData}  />
              
        </div>
      );
    } else if(i===step){
      return (
      <div key={step}>
          
      <Final step={step} nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} handleFormTables={handleInputTables} values={formData}/>

        </div>
      )
    }
  }
  /*switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div>
          
                <StepOne nextStep={nextStep} />
            
        </div>
      );

      case 2:
        return (
          <div>
           
                  <StepTwo nextStep={nextStep} prevStep={prevStep}  />
                
          </div>
        );

        case 3:
      return (
        <div>
          
                <Final nextStep={nextStep} prevStep={prevStep}/>
          
        </div>
      );
    default:
      return (
        <div>
        </div>
      );
  }*/
}

export default SurveyScreen
