/** @jsx React.DOM */
var React = require('react');
var EmployeeAction = require('../action/EmployeeActions');

var EmployeeItem = React.createClass({
  render: function () {
    return (
    	<div>
    		<div>{this.props.employee.id}</div>
    		<div>{this.props.employee.name}</div>
    		<div>{this.props.employee.address}</div>
    		<div>{this.props.employee.telephone}</div>
        <div>
          <button onClick={this._edit}>Edit</button>
          <button onClick={this._delete}>Delete</button>
        </div>
    	</div>
    );
  },
  _delete: function() {
    EmployeeAction.delete(this.props.employee.id);
  },
  _edit: function() {
    this.props.onEdit(this.props.employee.id);
  }
});

module.exports = EmployeeItem;
