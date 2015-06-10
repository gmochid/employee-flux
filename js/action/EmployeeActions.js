var AppDispatcher = require('../dispatcher/AppDispatcher');
var EmployeeConstants = require('../constants/EmployeeConstants');

var EmployeeAction = {
	create: function(name, address, telephone) {
		AppDispatcher.dispatch({
			actionType: EmployeeConstants.EMPLOYEE_CREATE,
			name: name,
			address: address,
			telephone: telephone
		});
	},

	update: function(employee) {
		AppDispatcher.dispatch({
			actionType: EmployeeConstants.EMPLOYEE_UPDATE,
			id: employee.id,
			employee: employee
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
