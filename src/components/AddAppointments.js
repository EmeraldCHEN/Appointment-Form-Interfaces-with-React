import React, { Component } from 'react';
import '../css/App.css';
import { FaPlus} from 'react-icons/fa';

class AddAppointments extends Component {
    constructor(props){
        super(props);
        this.state = {
            petName: '',
            ownerName: '',
            aptDate: '',
            aptTime: '',
            aptNotes: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd(e) {
        e.preventDefault(); // Prevent the form from submitting and eloading the page
        let tempApt = {
            petName: this.state.petName,
            ownerName: this.state.ownerName,
            aptDate: this.state.aptDate + ' ' + this.state.aptTime,
            aptNotes: this.state.aptNotes
        };

        this.props.addOneAppointment(tempApt);

        this.setState({
            petName: '',
            ownerName: '',
            aptDate: '',
            aptTime: '',
            aptNotes: ''
        });
        this.props.toggleForm();

    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            
           <div className = {
               "card textcenter mt-3 " + 
               (this.props.formDisplay ? '' : 'add-appintment')
               }
            > 
                <div className="card-header apt-addheading text-info text-center"
                     onClick = {this.props.toggleForm} >
                   <FaPlus /> Add Appointment
                </div>

                <div className="card-body">
                        <form action="#" id="aptForm" noValidate 
                            onSubmit={this.handleAdd} >
                            <div className="form-group form-row">
                                <label htmlFor="petName" className="col-md-5 col-form-label text-md-right" readOnly>
                                    Pet Name
                                </label>
                                <div className="col-md-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="petName" 
                                        placeholder="Pet's Name"
                                        value = {this.state.petName}
                                        onChange = {this.handleChange}
                                    />
                                </div>
                            </div>
                            
                            <div className="form-group form-row">
                                <label htmlFor="ownerName" className="col-md-5 col-form-label text-md-right" readOnly>
                                    Pet Owner
                                </label>
                                <div className="col-md-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="ownerName" 
                                    placeholder="Owner's Name"
                                    value = {this.state.ownerName}
                                    onChange = {this.handleChange}
                                  
                                />
                                </div>
                            </div>

                            <div className="form-group form-row">
                                <label htmlFor="aptDate" className="col-md-5 col-form-label text-md-right" >
                                    Date
                                </label>
                                <div className="col-md-3">
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    name="aptDate" 
                                    id = "aptDate"                                   
                                    value = {this.state.aptDate}
                                    onChange = {this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group form-row">
                                <label htmlFor="aptTime" className="col-md-5 col-form-label text-md-right" >
                                    Time
                                </label>
                                <div className="col-md-3">
                                <input 
                                    type="time" 
                                    className="form-control" 
                                    name="aptTime" 
                                    id="aptTime" 
                                
                                    value = {this.state.aptTime}
                                    onChange = {this.handleChange}
                                    
                                    required/>
                                </div>
                            </div>

                            <div className="form-group form-row">
                                <label htmlFor="aptNotes" className="col-md-5 col-form-label text-md-right" >
                                    Appointment Notes
                                </label>
                                <div className="col-md-3">
                                <textarea 
                                    className="form-control" 
                                    name="aptNotes" 
                                    rows="6" 
                                    cols="250" 
                                    placeholder="Appointment Notes" 
                                    value = {this.state.aptNotes}
                                    onChange = {this.handleChange}
                                >
                                </textarea>
                                </div>
                            </div>
                            {/* Center the button */}
                            <div className="form-group form-row align-items-center justify-content-center"> 
                                <button className="btn btn-warning d-block">
                                    SEND
                                </button>
                            </div>
                        </form>           
                </div>
            </div>
        );
    }
}
export default AddAppointments;
