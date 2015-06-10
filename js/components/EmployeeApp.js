var React = require('react');
var EmployeeStore = require('../store/EmployeeStore');
var EmployeeList = require('./EmployeeList');
var EmployeeInput = require('./EmployeeInput');
var EmployeeAction = require('../action/EmployeeActions');

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
    		<h2>Hello Employee</h2>
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
