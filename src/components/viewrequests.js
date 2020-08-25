import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import '../componentcss/viewcontactus.css';

export default class viewrequests extends Component {
    state={
        contactus: []
      }; 
      componentDidMount(){
        axios.get(`http://localhost:3000/admin/viewcontactus`)
        .then(res=> {   
          console.log(res);
          this.setState({contactus: res.data});
        });
      }
      deletethread = (userid) => {
        axios.delete(`http://localhost:3000/admin/deletecontactus/` + userid).then(response => {
         var check = window.confirm("Are you sure, you want to delete this Thread");
         if(check) { 
         if(response.data != null){
            this.setState( {
             contactus : this.state.contactus.filter(thread => thread._id !== userid)
            });
          }
         }
        }); 
     }  
    render() {
        return (
            <div>
              <h1 className="threadlist">Message Threads</h1>
              <div class="Table-responsive">
              <Table striped bordered hover variant="dark" id="table" style={{marginTop:"-30px"}}>
              <thead>
          <tr>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
              <tbody id="threaddetails"> 
                {this.state.contactus.map(thread=><tr>
                  <td style={{color:'lightblue'}}>
                  {thread.email}
                  </td>
                  <td>
                  {thread.subject}
                  </td>
                  <td style={{wordBreak:'break-all'}}>
                  {thread.text}
                  </td>
                  <td>
                  <button className="btn btn-danger" onClick={this.deletethread.bind(this, thread._id)}>Remove</button>
                  </td>
                  </tr>)}
              </tbody>
              </Table></div>
              </div>
          )
    }
}
