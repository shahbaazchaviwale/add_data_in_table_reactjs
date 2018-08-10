import React, { Component } from "react";
import FormData from "./Form_Data";
// Ui libraries
import { Table, Button, Alert } from "reactstrap";
import {  FaWindowClose } from "react-icons/fa";

export default class Main extends Component{
    // ============================DATA DECLARATION
    state = { data_list: [],  visible: true, remove_msg : ''};
    
    // ============================== bootstrap function.
    onDismiss = () => {
    this.setState({ visible: false });
  }

    // ============================FUNCTION DECLARATION
    SaveList = (props_new_data) =>{
      let get_date,newObjTodo,newList, get_data
       get_data = props_new_data.toUpperCase();
       get_date = this.getCurrentDate();
       newObjTodo = { id: this.state.data_list.length + 1, name: get_data, created_date: get_date };
       newList = [...this.state.data_list, newObjTodo];
      this.setState({ data_list: newList, props_new_data: "" });
    }

    getCurrentDate = () => {
      let today = new Date(),
        date = today.getDate() + '-'
          + (today.getMonth() + 1)
          + '-' + today.getFullYear()
          + ' ' + today.getHours()
          + ':' + today.getUTCMinutes();
      return date;
    }

  removeList = (id) =>{
    let data_list = this.state.data_list.filter(item => item.id !== id);
    this.setState({ data_list, remove_msg: 'show' }); //pass exist state array
  }

  render(){       
        return <div>
            <FormData pass_props_method={this.SaveList} props_remove_item={this.state.remove_msg} />
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data_list.length ? this.state.data_list.map(
                    set_list => (
                      <tr key={set_list.id}>
                        <th>{set_list.id}</th>
                        <td>{set_list.name}</td>
                        <td>{set_list.created_date}</td>
                        <td>
                          <Button
                            color="danger"
                            onClick={() => this.removeList(set_list.id)}
                          >
                            Remove <FaWindowClose />
                          </Button>
                        </td>
                      </tr>
                    )
                  ) : <tr>
                    <td colSpan="4">
                      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                        <b>Warning :</b> Please add data on text box to get list
                      </Alert>
                    </td>
                  </tr>}
              </tbody>
            </Table>
          </div>;
    }
}