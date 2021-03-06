import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useNavigate } from 'react-router-dom'

import { Store } from 'react-notifications-component';

import { deleteSurvey } from '../actions/surveyActions';

const Survey = ({survey}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;

  const DeleteHandler = (id) => {
      dispatch(deleteSurvey(id)).then((data) => {
        if(data._id) {
          Store.addNotification({
            title: "Survey successfully deleted!",
            type: "success",
            insert: "top",
            container: "top-right",
            dismiss: {
              duration: 2000,
            }
          });
        } else {
          Store.addNotification({
            title: "Survey is not deleted!",
            type: "danger",
            insert: "top",
            container: "top-right",
            dismiss: {
              duration: 2000,
            }
          });
        }
      })
  };
  const updateHandler = (id) => {
    navigate(`/surveys/${id}`)
  }
  const participateHandler = (id) => {
    if(user!==null) {
      navigate(`/surveys/reply/${id}`)
    } else {
      navigate({
        pathname: "/login",
        search: `?${createSearchParams({
          next: '-surveys-reply-'+id
      })}`
    });
    }
  }

  const participantsHandler = (survey) => {
    if(survey.participants.length === 0) {
      Store.addNotification({
        title: "No participants yet!",
        type: "danger",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 2000,
        }
      });
    } else {
      navigate(`/list-participants/${survey._id}`)
    }
  }
  return (
    <div style={{cursor: 'pointer'}}>
      <div className="card mt-3">
      { user?.type==="admin" || user?.type==="company" ? (
        <div>
          <div className="card-body" key={`key${survey._id}`} id={`q-${survey._id}`}>
          <p className="card-text"  data-toggle="collapse" data-target={`#collapse${survey._id}`} aria-expanded="true" aria-controls="collapseOne">{survey.title}</p>
          </div>
          <ul className="list-group list-group-flush collapse"  id={`collapse${survey._id}`} aria-labelledby={`heading${survey._id}`} data-parent={`#q-${survey._id}`}>
          <li className="list-group-item d-flex flex-row justify-content-between">
            {survey.countries.map((country) => (  
              <div key={country}>{country}</div>
            ))}
          </li>
          <li className="list-group-item d-flex flex-row justify-content-between">
            {survey.domains.map((domain) => (  
            <div key={domain._id}>{domain.title}</div>
            ))}
          </li>
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
                        <li key={`ch-${index}`}>{choice}</li>
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
      ) : (
        <div className="card-body" key={`key${survey._id}`} id={`q-${survey._id}`}>
          <p className="card-text">{survey.title}</p>
        </div>
      )}
      <div className="card-body d-flex flex-row justify-content-between">
        <div>
          {user?.type === 'admin' || user?.type === 'company' && ( 
          <span>
            <button type="button" className="btn card-link" disabled>{survey.price}$</button>
            <button type="button" className="btn card-link" disabled>{survey.closed ? "Closed" : (!survey.uploadedRequest ? "In Progress" : (survey.isVerified ? "Verified" : "Waiting"))}</button>
            <button type="button" className="btn card-link" disabled>Min : {survey.minResponses}</button>
            <button type="button" className="btn card-link" style={{ color: '#ADD8E6' }} onClick={() => participantsHandler(survey) }><strong>Participants : {survey.participants.length}</strong></button>
          </span>
          )}
          {user?.type === 'admin' || user?.type === 'participant' && ( 
            <button type="button" className="btn card-link" disabled>Participation : {survey.responsePrice}$</button>
          )}
          <button type="button" className="btn card-link" disabled>
          {new Intl.DateTimeFormat('en-US', {
                                   year: 'numeric',
                                   month: 'long',
                                   day: '2-digit'
                                  }).format(new Date(survey.createdAt))}
          </button>
        </div>
      <div>

      {(user?.type === 'admin' || user?.type === 'company') && (
        <div>
        <button type="button" className="btn btn-sm btn-secondary card-link" onClick={() => updateHandler(survey._id)}>Update</button>
        <button type="button" className="btn btn-sm btn-primary card-link" data-toggle="modal" data-target={`#exampleModalCenter-${survey._id}`}>
           Delete
        </button>
        <div className="modal fade" id={`exampleModalCenter-${survey._id}`} tabIndex="-1" role="dialog" aria-labelledby={`exampleModalCenterTitle-${survey._id}`} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`exampleModalLongTitle-${survey._id}`}>DELETE SURVEY</h5>
                <button type="button" className="btn close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure ?
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary card-link" data-dismiss="modal"  onClick={() => DeleteHandler(survey._id)}>Yes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
      {(user?.type === 'participant' || user===null) && (
        <button type="button" className="btn btn-sm btn-primary card-link" onClick={() => participateHandler(survey._id)}>Reply</button>
      )}
    </div>
  </div>
 </div>
</div>
)}

export default Survey
