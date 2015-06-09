/** @jsx React.DOM */
var React = require('react');
var EmployeeItem = require('./EmployeeItem');

var EmployeeList = React.createClass({
  render: function () {

  	var employeeList = [];
  	var allEmployees = this.props.allEmployees;

  	for(var key in allEmployees) {
  		employeeList.push(
        <EmployeeItem key={key} employee={allEmployees[key]} />
      );
  	}

    return (
      <div>
      	<ul>
          {employeeList}
        </ul>
      </div>
    );
  }
});

module.exports = EmployeeList;
