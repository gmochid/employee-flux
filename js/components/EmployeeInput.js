/** @jsx React.DOM */
var React = require('react/addons');

var EmployeeInput = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      id: "",
      name: "",
      address: "",
      telephone: ""
    };
  },

  componentWillMount: function () {
    if (this.props.employee) {
      this.setState({
        id: this.props.employee.id,
        name: this.props.employee.name,
        address: this.props.employee.address,
        telephone: this.props.employee.telephone
      });
    }
  },

  render: function () {
    return (
      <div>
        <div>
          <input ref="name" placeholder="Name" valueLink={this.linkState("name")}/>
        </div>
        <div>
          <input ref="address" placeholder="Address" valueLink={this.linkState("address")}/>
        </div>
        <div>
          <input ref="telephone" placeholder="Telephone" valueLink={this.linkState("telephone")}/>
        </div>
        <div>
          <button onClick={this._save}>Save</button>
        </div>
      </div>
    );
  },
  _save: function() {
    this.props.onSave(this.state);
    this.setState({
      name: "",
      address: "",
      telephone: ""
    });
  }
});

module.exports = EmployeeInput;
