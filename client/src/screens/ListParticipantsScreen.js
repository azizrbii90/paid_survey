import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'


const ListParticipantsScreen = () => {

  const [survey, setSurvey] = useState(null)
  const { id } = useParams();
  const surveyReducer = useSelector((state) => state.surveyReducer);
  const { loading, surveys } = surveyReducer;

  const navigate = useNavigate()

  useEffect(() => {

      for(let i=0; i < surveys.length; i++) {
        if(surveys[i]?._id===id) {
          let MySurvey = Object.assign({}, surveys[i])
          setSurvey(MySurvey);
          break
        }
      }
    
  },[surveys])

  useEffect(() => {

      for(let i=0; i < surveys.length; i++) {
        if(surveys[i]?._id===id) {
          let MySurvey = Object.assign({}, surveys[i])
          setSurvey(MySurvey);
          break
        }
      }
    
  },[])

  return (
    <div>
      <br></br>
      <div className="d-flex flex-row justify-content-between mb-5">
        <h3>List Participants</h3>
        <button type="button" className="btn btn-sm btn-primary" onClick={() => navigate(`/list-surveys`)}>back</button>
      </div>
      {survey!==null && (
        
        <div style={{cursor: 'pointer'}}>
          {survey.participants.map((participant, i) => {
            return (      

              <div className="card mt-3" key={`key-${participant._id}`}>
                <div className="card-body" id={`q-${participant._id}`}>
                  <p className="card-text"  data-toggle="collapse" data-target={`#collapse${participant._id}`} aria-expanded="true" aria-controls="collapseOne">participant {i + 1}</p>
                </div>
                <ul className="list-group list-group-flush collapse"  id={`collapse${participant._id}`} aria-labelledby={`heading${participant._id}`} data-parent={`#q-${participant._id}`}>
                  <li className="list-group-item">
                    {survey.questions.map((question,c) => (  
                      <div key={`key${c}`} id={`q-${c}`} >
                        <div className="card">
                          <div className="card-header" id={`heading${c}`}>
                            <h5 className="mb-0">
                              <button className="btn" data-toggle="collapse" data-target={`#collapse${c}`} aria-expanded="true" aria-controls="collapseOne">
                                {question.title}
                              </button>
                            </h5>
                          </div>
                          <div id={`collapse${c}`} className="collapse" aria-labelledby={`heading${c}`} data-parent={`#q-${c}`}>
                            <div className="card-body">
                              <ul>
                                {question.choices.map((choice,index) => ( 
                                  <div>     
                                    <div style={{ textDecoration: survey?.responses[i]?.response[c]?.responses.includes(index.toString()) && 'underline', color : survey?.responses[i]?.response[c]?.responses.includes(index.toString()) && '#483D8B' }} key={`ch-${index}`}>{choice}</div>
                                  </div>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>  
                    ))}
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    )}
  </div>
 )
}

export default ListParticipantsScreen
