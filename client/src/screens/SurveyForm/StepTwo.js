import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Chips, { Chip } from 'react-chips'


const StepTwo = ({ nextStep, prevStep,  handleFormData, handleFormTables, values }) => {
  const [countries, setCountries] = useState(values.countries)
  const [domain_survey, setDomain_survey] = useState(values.domains)
  const [titles, setTitles] = useState([])

  const domainReducer = useSelector((state) => state.domainReducer);
  const { isLoading, domains } = domainReducer;
 
  useEffect(() => {
    const domainTitles = domains.map(d => d.title)
    setTitles(domainTitles)
  },[])

  useEffect(() => {
    const domainTitles = domains.map(d => d.title)
    setTitles(domainTitles)
  },[domains])
  

  const onChange = countries => {
    setCountries(countries);
    handleFormTables(countries,domain_survey,values.questions)
  }

  const onChangeTitles = domain_survey => {
    setDomain_survey(domain_survey);
    handleFormTables(countries,domain_survey,values.questions)
  }
  const nextHandler = () => {
      nextStep();
  };
  const previousHandler = () => {
    prevStep();
  };

  return (
    <div>
    <div className="row justify-content-center">
      
      <div className="col-4">
        <h4>Step Two</h4>
        <label className="form-check-label mt-4">Countries</label>
        <Chips
          value={countries}
          onChange={onChange}
          suggestions={["Tunisia", "Algeria", "Mali"]}/>
      
        <div className="form-check form-switch mt-4">
          <input className="form-check-input" type="checkbox" checked={values.closed} onChange={handleFormData("closed")} />
          <label className="form-check-label">closed</label>
        </div>
      </div>
      <div className="col-4">
        <h4>&nbsp;</h4>
        <label className="form-check-label mt-4">Domains</label>
        <Chips
          value={domain_survey}
          onChange={onChangeTitles}
          suggestions={titles}/>
        <div className="form-check form-switch mt-4">
          {values.uploadedRequest}
          <input className="form-check-input" type="checkbox" checked={values.uploadedRequest} onChange={handleFormData("uploadedRequest")} />
          <label className="form-check-label">Uploaded Request</label>
        </div>
        <div style={{float:'right'}} className="mt-2">
          <button className="btn btn-primary btn-sm mt-5" style={{width:'80px'}} onClick={previousHandler} >previous</button>
           &nbsp;
          <button className="btn btn-primary btn-sm mt-5" style={{width:'80px'}} onClick={nextHandler} >next</button>
        </div>
      </div>       
    </div>
  </div>
 );
};

export default StepTwo;