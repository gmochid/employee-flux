/** @jsx React.DOM */
var React = require('react/addons');

var EmployeeInput = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      name: "",
      address: "",
      telephone: ""
    };
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
          <button onClick={this.handleSubmit}>Add</button>
        </div>
        <div>
          {this.state.name}<br/>
          {this.state.address}<br/>
          {this.state.telephone}
        </div>
      </div>
    );
  },
  handleSubmit: function() {
    
  }
});

module.exports = EmployeeInput;
