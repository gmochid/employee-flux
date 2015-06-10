/** @jsx React.DOM */
var React = require('react');
var EmployeeItem = require('./EmployeeItem');
var EmployeeInput = require('./EmployeeInput');
var EmployeeAction = require('../action/EmployeeActions');

var EmployeeList = React.createClass({
  getInitialState: function () {
    return {
      editEmployeeId: null
    };
  },
  render: function () {

  	var employeeList = [];
  	var allEmployees = this.props.allEmployees;

  	for(var key in allEmployees) {
      if(key == this.state.editEmployeeId) {
        employeeList.push(
          <li key={key}><EmployeeInput employee={allEmployees[key]} onSave={this._edit} /></li>
        );
      } else {
    		employeeList.push(
          <li key={key}><EmployeeItem employee={allEmployees[key]} onEdit={this._editClicked}/></li>
        );
      }
  	}

    return (
      <div>
      	<ul>
          {employeeList}
        </ul>
      </div>
    );
  },
  _editClicked: function(id) {
    this.setState({
      editEmployeeId: id
    });
  },
  _edit: function(employee) {
    this.setState({
      editEmployeeId: null
    });
    EmployeeAction.update(employee);
  }
});

module.exports = EmployeeList;
