import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { updateSurvey } from '../actions/surveyActions';
import { Store } from 'react-notifications-component';

const Response = ({step, nextStep, prevStep, handleFormData, values}) => {
  
  const [responses, setResponses] = useState([])
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    let oldResponses = []
    if(values!==undefined ) {
      if(values.responses !==undefined) {
        if((values.responses.length > 0 && values.responses[values.responses.length-1]!==undefined)) {
          oldResponses = values.responses[values.responses.length-1].response
        } else {
          oldResponses = values.responses[values.responses.length].response
        }
        if(oldResponses.length>step) {  
          setResponses(oldResponses[step].responses)
        }
      }
    }
  },[])

  const nextHandler = async () => {
      
      if(responses.length>0) {
        await handleFormData(responses)
        nextStep();
      }
      else {
        Store.addNotification({
          title: "Choose response please",
          type: "danger",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 2000,
          }
        });
      }
  }

  const prevHandler = async () => {
      await handleFormData(responses)
      prevStep();
  }

  const submitHandler = async () => {
    if(responses.length>0) {
      await handleFormData(responses)
      values.participants.push(user._id)
      dispatch(updateSurvey(values)).then((data) => {
        if(data._id) {
          Store.addNotification({
            title: "Thank you!",
            type: "success",
            insert: "top",
            container: "top-right",
            dismiss: {
              duration: 2000,
            }
          });
          navigate('/list-surveys')
        } else {
          Store.addNotification({
            title: "Oups there is problem!",
            type: "danger",
            insert: "top",
            container: "top-right",
            dismiss: {
              duration: 2000,
            }
          });
        }
      })
    }
    else {
      Store.addNotification({
        title: "Choose response please",
        type: "danger",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 2000,
        }
      });
    }
  }

  const handleChange = (e) => {
      const value = e.target.value
      if(e.target.checked) {
          setResponses([...responses, value]);
          //setResponses([value].concat(responses))
      } else {
          setResponses(responses.filter((r) => r !== value))
      } 
  }
  
  return (
    <div>
    <div className="row justify-content-center">
      <div className="col-8">
       {values?.questions && (
       <div>
           <h3 className="mt-5">{values?.questions[step]?.title}</h3>

           <div className="mt-5">
            {values.questions[step].choices.map((choice,i) => (  
              <div key={i} className="mt-3">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={responses.includes(i.toString())} value={`${i}`} onChange={e => handleChange(e)} id={`flexCheckDefault-${i}`}/>
                    <label className="form-check-label" htmlFor={`flexCheckDefault-${i}`}>
                        {choice}
                    </label>
                </div>
              </div>
            ))}
           </div>

           {values?.questions.length === step+1 ? (
                <button className="btn btn-primary btn-sm mt-5" style={{float: 'right', width:'80px'}}  onClick={submitHandler} >submit</button>
            ) : (
                <button className="btn btn-primary btn-sm m-1 mt-5" style={{float: 'right', width:'80px'}}  onClick={nextHandler} >next</button>
            )}
            {step > 0 && (
              <button className="btn btn-primary btn-sm m-1 mt-5" style={{float: 'right', width:'80px'}}  onClick={prevHandler} >previous</button>
            )}
       </div>)}
    </div>
  </div>
 </div>
)
}

export default Response
