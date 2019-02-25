import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';

// import {findIndex, without} from 'lodash';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      myAppointments: [],
      lastIndex: 0,
      formDisplay: false,
      orderDirection: "ascending",
      orderBy: 'aptDate',
      queryText:''
    }
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addOneAppointment = this.addOneAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }

  searchApts(query){
    this.setState ({
      queryText: query
    })
  }

  changeOrder(order, direction){
    this.setState({
      orderBy: order,
      orderDirection: direction
    });
  }

  updateInfo(name,value,id){
    let tempApts = this.state.myAppointments;
    // let aptIndex = findIndex(this.state.myAppointments, {aptId: id});
    // tempApts[aptIndex][name] = value;
    tempApts[name] = value;
    this.setState({
      myAppointments: tempApts
    })
  }

  addOneAppointment(appt) {
    let tempApts = this.state.myAppointments;
    appt.aptId = this.state.lastIndex;
    tempApts.unshift(appt);
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1
    })

  }

  deleteAppointment(appt) {
    let tempApts = this.state.myAppointments;
    // Originally in the tutorial, the method without from lodash is used to return an array without the record deleted
    // tempApts = without(tempApts, appt);

// To improve speed and performance, JavaScript itself has many great built-in methods and functions that can replace all the functionality of lodash or other libraries.
    tempApts = tempApts.filter(apt => (apt !== appt));

    this.setState({
      myAppointments: tempApts
    })
  }

  // Use the lifecycle method componentDidMount() to fetch the data from an external sourse,
  // after the component is rendered correctly, componentDidMount() function is called
  componentDidMount(){
    // As far as JS is concerned, once our app all gets assembled, the data.json file will be in the same folder as the current document
    fetch('./data.json')
      .then(response => response.json()) //Get the JSON file of the response to a request to a server 
      .then(result => { // Again use the then promise method to take that result and process it by creating a variable appoinments
        // Use JS map function to go through each of the elements in JSON file and return them, just unprocessed
        const appoinments = result.map(item => {
          // Add an appointment ID variable to the list
          item.aptId = this.state.lastIndex;
          // Use the setState method to pass in an object that I want to modify
          this.setState({
            lastIndex: this.state.lastIndex + 1
          })
          return item;
        });
        this.setState({
          myAppointments: appoinments
        });
      });
  }

  render() { 
    
    let order;
    let filteredApts = this.state.myAppointments;
    if(this.state.orderDirection === 'ascending') {
      order = 1;
    } else {
      order = -1;
    }
    
    filteredApts = filteredApts.sort((a,b) => {
      if(a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()){
        return -1 * order;
      }else{
        return 1 * order;
      }
    }).filter(item => {
      return(
        item['petName'].toLowerCase().includes(this.state.queryText.toLowerCase()) || 
        item['ownerName'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
        item['aptDate'].includes(this.state.queryText)
      );
    })
    

    // Higher-order functions don't allow to modify arrays directly
  /* filteredApts = filteredApts.filter(item => {
      return(
        item['petName'].toLowerCase().includes(this.state.queryText.toLowerCase()) || 
        item['ownerName'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
        item['aptNotes'].toLowerCase().includes(this.state.queryText.toLowerCase())
      );
    })
  */

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                
                {/* Objects are not valid as a React child  */}
                {/* Pass along props to the sub-component */}
                <AddAppointments 
                  formDisplay = {this.state.formDisplay} 
                  toggleForm = {this.toggleForm}
                  addOneAppointment = {this.addOneAppointment}
                />

                <SearchAppointments 
                  orderBy = {this.state.orderBy}
                  orderDirection = {this.state.orderDirection}
                  changeOrder = {this.changeOrder}
                  searchApts = {this.searchApts}
                />

                <ListAppointments  
                  listAppointment = {filteredApts}                
                  deleteAppointment = {this.deleteAppointment}
                  updateInfo = {this.updateInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
       
    );
  }
}

export default App;
