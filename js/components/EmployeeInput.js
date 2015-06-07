/** @jsx React.DOM */
var React = require('react');

var EmployeeInput = React.createClass({
  render: function () {
    return (
      <div>
      	<div>
      		<input type="text" placeholder="Name"/>
      	</div>
      	<div>
      		<input type="text" placeholder="Address"/>
      	</div>
      	<div>
      		<input type="text" placeholder="Telephone"/>
      	</div>
      </div>
    );
  }
});

module.exports = EmployeeInput;
