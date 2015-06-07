/** @jsx React.DOM */
var React = require('react');

var EmployeeItem = React.createClass({
    render: function () {
        return (
        	<li>
        		<div>{this.props.employee.id}</div>
        		<div>{this.props.employee.name}</div>
        		<div>{this.props.employee.address}</div>
        		<div>{this.props.employee.telephone}</div>
        	</li>
        );
    }
});

module.exports = EmployeeItem;