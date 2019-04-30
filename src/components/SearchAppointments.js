import React, { Component } from 'react';
import '../css/App.css';
import { FaSistrix } from "react-icons/fa";

class SearchAppointments extends Component {
    render() {
        return (
            <div className="search-appointments row justify-content-center my-4">
                <div className="col-md-6">
                    <div className="input-group">
                    {/* The aria-label attribute is used to define a string that labels the current element. 
                        Use it in cases where a text label is not visible on the screen. */}
                        <div className="search-bar"> 
                            <i className="search-icon"><FaSistrix /></i>
                            <input 
                                type = "text" 
                                id="searchApts" 
                                className="form-control" 
                                aria-label="Search Appointments" 
                                onChange = {e => this.props.searchApts(e.target.value)}
                            />
                        </div>
                        <div className="input-group-append">
                            <button type = "button" 
                                className = "btn btn-warning dropdown-toggle"
                                data-toggle = "dropdown"
                                aria-haspopup = "true"
                                aria-expanded = "false" 
                            >
                                Sort by: <span className="caret"></span>
                            </button>

                            <div className="sort-menu dropdown-menu dropdown-menu-right">
                                <button className = {
                                    "sort-by dropdown-item " + (this.props.orderBy === 'petName' ? 'active' : '')
                                    } 
                                    onClick = {e => this.props.changeOrder('petName', this.props.orderDirection)}
                                    href="#">
                                    Pet Name
                                </button>
                                <button className = {
                                    "sort-by dropdown-item " + (this.props.orderBy === 'aptDate' ? 'active' : '')
                                    } 
                                    onClick = {e => this.props.changeOrder('aptDate', this.props.orderDirection)}
                                    href="#">
                                    Date
                                </button>
                                <button className = {
                                    "sort-by dropdown-item " + (this.props.orderBy === 'ownerName' ? 'active' : '')
                                    } 
                                    onClick = {e => this.props.changeOrder('ownerName', this.props.orderDirection)}
                                    href="#"
                                >
                                    Owner
                                </button>
                                {/* Seperate button groups */}
                                <div role="separator" className="dropdown-divider" />

                                <button className = {
                                    "sort-by dropdown-item " + (this.props.orderDirection === 'ascending' ? 'active' : '')
                                    } 
                                    onClick = {e => this.props.changeOrder(this.props.orderBy, 'ascending')}
                                    href="#">
                                    Ascending
                                </button>
                                <button className = {
                                    "sort-by dropdown-item " + (this.props.orderDirection === 'descending' ? 'active' : '')
                                    } 
                                    onClick = {() => this.props.changeOrder(this.props.orderBy, 'descending')}
                                    href="#">
                                    Descending
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchAppointments;
