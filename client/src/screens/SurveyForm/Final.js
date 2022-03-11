import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';  

import { useNavigate, useParams } from 'react-router-dom';
import { Store } from 'react-notifications-component';

import { createSurvey, updateSurvey } from '../../actions/surveyActions';


const Final = ({ step, nextStep, prevStep,  handleFormData, handleFormTables, values }) => {

    const [inputList, setInputList] = useState({title: '', choices: ['']});
    const { id } = useParams();

    const domainReducer = useSelector((state) => state.domainReducer);
    const { isLoading, domains } = domainReducer;

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
      if(values.questions.length>0 && values.questions.length>step-3) {
        setInputList(values.questions[step-3]);
      }
    },[])
   
    const handleInputChange = (e, i) => {
      const value  = e.target.value;
      let choices = inputList.choices;
      choices[i] = value
      setInputList({...inputList, choices: choices});
    };
     
    // handle click event of the Remove button
    const handleRemoveClick = (i) => {
      let choices = inputList.choices;
      choices.splice(i, 1);
      setInputList({...inputList, choices: choices});
    };
     
    // handle click event of the Add button
    const handleAddClick = (i) => {
      if(!document.getElementById(i).validity.valid) {
        document.getElementById(i).placeholder = 'Choice is required'
      } else {
        let choices = inputList.choices;
        choices.push('')
        setInputList({...inputList, choices: choices});
      }
    };

    const submitHandler = () => {
      let valid = true;
      if(!document.getElementById('question').validity.valid) {
        document.getElementById('questionMessage').style.display = 'block';  
        valid = false  
      }
      if(!document.getElementById(inputList.choices.length-1).validity.valid) {
        document.getElementById(inputList.choices.length-1).placeholder = 'Choice is required'
        valid = false
      } 
      if(valid) {
        values.questions.splice(step-3,values.questions.length)
        for(let i=0; i<domains.length; i++) {
            let index = values.domains.findIndex(element => {
            if (element===domains[i].title) {
              return true;
            }
          });
          if(index!==-1) {
            values.domains[index] = domains[i]._id
          }
        }
        handleFormTables(values.countries,values.domains,inputList)
        console.log("submit", values)
        if(id==='-1') {
          dispatch(createSurvey(values)).then((data) => {
            if(data._id) {
              Store.addNotification({
                title: "Survey successfully created!",
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
                title: "Survey is not created!",
                type: "danger",
                insert: "top",
                container: "top-right",
                dismiss: {
                  duration: 2000,
                }
              });
            }
          })
        } else {
          dispatch(updateSurvey(values)).then((data) => {
            if(data._id) {
              Store.addNotification({
                title: "Survey successfully updated!",
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
                title: "Survey is not updated!",
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
      }
    };

    const previousHandler = () => {
      handleFormTables(values.countries,values.domains,inputList)
      prevStep();
    };

    const addChoiceHandler = () => {
      let valid = true;
      if(!document.getElementById('question').validity.valid) {
        document.getElementById('questionMessage').style.display = 'block';  
        valid = false  
      }
      if(!document.getElementById(inputList.choices.length-1).validity.valid) {
        document.getElementById(inputList.choices.length-1).placeholder = 'Choice is required'
        valid = false
      } 
      if(valid) {
        handleFormTables(values.countries,values.domains,inputList)
        nextStep();
      }
    }

  return (
    <div>
    <div className="row justify-content-center">
      <div className="col-8">
        <h4>Step Three</h4>
        <div className="form-group mt-5">
          <label className="form-label" >Question</label>
          <input id="question" type="text" className="form-control-sm form-control" required value={inputList.title} onChange={(e) => setInputList({...inputList, title: e.target.value})} placeholder="Enter question" />
          <small id ="questionMessage" style= {{display: 'none'}}  className="form-text text-danger">Question is required, if you want to submit go to previous step</small>
        </div>
        {inputList.choices.map((c, i) => {
          return (
            <div key={i} className="row mt-3">
              <div className="col-7">
                <div>
                  <input
                    id={i}
                    name="choice"
                    type="text" className="form-control-sm form-control" placeholder="Enter choice"
                    value={c}
                    required
                    onChange={e => handleInputChange(e,i)}
                  />
                </div>
              </div>
            
              <div className="col-5">
                <div>
                  {inputList.choices.length !== 1 && <button className="btn btn-danger btn-sm mx-1" style={{width:'89px'}} onClick={() => handleRemoveClick(i)}>remove</button>}
                  {inputList.choices.length - 1 === i && <button className="btn btn-primary btn-sm" style={{width:'89px'}} onClick={() => handleAddClick(i)}>add</button>}
                </div>
              </div>
            </div>
          )
        })} 
        <div style={{float:'right'}}  className="mt-5">
          <button className="btn btn-primary btn-sm" style={{width:'90px'}} onClick={previousHandler} >previous</button>&nbsp;
          <button className="btn btn-primary btn-sm" style={{width:'100px'}} onClick={addChoiceHandler} >add question</button>&nbsp;
          <button className="btn btn-primary btn-sm" style={{width:'90px'}} onClick={submitHandler} >submit</button>  
        </div>
      </div>
    </div>
  </div>
 );
};

export default Final;
