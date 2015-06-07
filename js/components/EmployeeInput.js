/** @jsx React.DOM */
var React = require('react');
var forms = require('newforms');

var EmployeeForm = forms.Form.extend({
  name: forms.CharField(),
  address: forms.CharField(),
  telephone: forms.CharField()
});

var EmployeeInput = React.createClass({
  render: function () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        	<forms.RenderForm form={EmployeeForm} ref="employeeForm"/>
          <button>Add</button>
        </form>
      </div>
    );
  },
  handleSubmit: function() {
    var form = this.refs.employeeForm.getForm();
    console.log(form);
  }
});

module.exports = EmployeeInput;
