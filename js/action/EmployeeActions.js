var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var EmployeeAction = {
	create: function(name, address, telephone) {
		AppDispatcher.dispatch({
			actionType: EmployeeConstants.EMPLOYEE_CREATE,
			name: name,
			address: address,
			telephone: telephone
		});
	},

	update: function(id) {
		AppDispatcher.dispatch({
			actionType: EmployeeConstants.EMPLOYEE_UPDATE,
			id: id
		});
	},

	delete: function(id) {
		AppDispatcher.dispatch({
			actionType: EmployeeConstants.EMPLOYEE_DESTROY,
			id: id
		});
	}
};

module.exports = EmployeeAction;
