var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var EmployeeConstants = require('../constants/EmployeeConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _employees = {
	'1': {
		id: '1',
		name: 'John Snow',
		address: 'Minato-ku Konan',
		telephone: '123-123-123'
	}
};

/**
 * Create an Employee item
 * @param  {string} name      The name of the employee
 * @param  {string} address   The address of the employee
 * @param  {string} telephone The telephone number of the employee
 */
function create(name, address, telephone) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _employees[id] = {
  	id: id,
  	name: name,
  	address: address,
  	telephone: telephone
  };
}

function update(id, updates) {
	_employees[id] = assign({}, _employees[id], updates);
}

/**
 * Delete an Employee item
 * @param  {string} id The id of the employee
 */
function destroy(id) {
	delete _employees[id];
}

var EmployeeStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _employees;
	},

	emitChanges: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

});

AppDispatcher.register(function(action) {
	var text;

	switch(action.actionType) {
		case EmployeeConstants.EMPLOYEE_CREATE:
			break;
		case EmployeeConstants.EMPLOYEE_DESTROY:
			break;
		case EmployeeConstants.EMPLOYEE_UPDATE:
			break;
		default:
			break;
	}
});

module.exports = EmployeeStore;
