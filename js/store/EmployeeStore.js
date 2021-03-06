var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var EmployeeConstants = require('../constants/EmployeeConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _employees = {};

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
			create(
				action.name, 
				action.address, 
				action.telephone
			);
			EmployeeStore.emitChanges();
			break;
		case EmployeeConstants.EMPLOYEE_DESTROY:
			destroy(action.id);
			EmployeeStore.emitChanges();
			break;
		case EmployeeConstants.EMPLOYEE_UPDATE:
			update(action.id, action.employee);
			EmployeeStore.emitChanges();
			break;
		default:
			break;
	}
});

module.exports = EmployeeStore;
