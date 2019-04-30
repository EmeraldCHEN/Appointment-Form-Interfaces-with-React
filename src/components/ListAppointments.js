import React, { Component } from 'react';
import '../css/App.css';

// import { FaCheck} from 'react-icons/fa';
import Moment from 'react-moment';

class ListAppointments extends Component {
    render() {
        return (
            <div className="appointment-list item-list mb-3">
                {this.props.listAppointment.map( item => (
                    // Each child in a list should have a unique "key" prop
                    <div className="pet-item col media py-3" key={item.aptId}>
                        <div className="mr-3">
                            <button className="pet-delete btn btn-sm btn-danger"
                              onClick={() => this.props.deleteAppointment(item)}> 
                              X
                                {/* Using third-party component "react-icons": "^3.4.0" */}
                                {/* <FaCheck /> */}
                            </button>
                        </div>
                        <div className="pet-info media-body">
                            <div className="pet-head d-flex">
                                <span 
                                    className="pet-name" 
                                    contentEditable 
                                    suppressContentEditableWarning
                                    onBlur = {
                                        e => this.props.updateInfo('petName', e.target.innerText, item.aptId)
                                    }                       
                                >
                                    {item.aptId + 1}. {item.petName}
                                </span>
                                <div className="apt-date ml-auto">
                                {/* Using third-party component "react-moment": "^0.8.4", */}
                                 <Moment
                                   date = {item.aptDate} 
                                   parse = "YYYY-MM-DD hh:mm"
                                   format = "ddd DD-MMM-YYYY hh:mma"
                                  />
                                 
                                </div>
                            </div>

                            <div className="owner-name">
                                <span className="label-item" >Owner: </span>
                                <span
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur = {
                                        e => this.props.updateInfo('ownerName', e.target.innerText, item.aptId)
                                    }
                                >{item.ownerName}</span>
                            </div>
                            <div 
                                className="apt-notes" 
                                contentEditable
                                suppressContentEditableWarning
                                onBlur = {
                                    e => this.props.updateInfo('aptNotes', e.target.innerText, item.aptId)
                                }
                            >
                                {item.aptNotes}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default ListAppointments;
