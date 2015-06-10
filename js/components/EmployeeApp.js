var React = require('react');
var EmployeeStore = require('../store/EmployeeStore');
var EmployeeList = require('./EmployeeList');
var EmployeeInput = require('./EmployeeInput');
var EmployeeAction = require('../action/EmployeeActions');
var PageHeader = require('react-bootstrap').PageHeader;
var Well = require('react-bootstrap').Well;

function getEmployeeState() {
	return {
		allEmployees: EmployeeStore.getAll()
	};
}

var EmployeeApp = React.createClass({
	getInitialState: function() {
		return getEmployeeState();
	},

	componentDidMount: function () {
	  EmployeeStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function () {
	  EmployeeStore.removeChangeListener(this._onChange);  
	},

	_onChange: function() {
    this.setState(getEmployeeState());
  },

	render: function() {
		return (
    	<div>
    	  <PageHeader>Employee Management System<small>Hello</small></PageHeader>
    		<EmployeeList allEmployees={this.state.allEmployees}/>
    		<EmployeeInput onSave={this._save}/>
			</div>
		);
	},
	
	_save: function(newEmployee) {
    EmployeeAction.create(
      newEmployee.name,
      newEmployee.address,
      newEmployee.telephone
    );
  }
});

module.exports = EmployeeApp;
