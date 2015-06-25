
jest.dontMock('../../constants/EmployeeConstants');
jest.dontMock('../EmployeeStore');
jest.dontMock('object-assign');

describe('EmployeeStore', function() {
  
  var EmployeeConstants = require('../../constants/EmployeeConstants');
  var AppDispatcher;
  var EmployeeStore;
  var callback;
  
  var actionEmployeeCreate = {
    actionType: EmployeeConstants.EMPLOYEE_CREATE,
		name: 'name',
		address: 'address',
		telephone: 'telephone'
  };
  
  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    EmployeeStore = require('../EmployeeStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });
  
  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
  
  it('should initialize with no employee', function() {
    var all = EmployeeStore.getAll();
    expect(all).toEqual({});
  });
  
  it('creates an employee', function() {
    callback(actionEmployeeCreate);
    var all = EmployeeStore.getAll();
    var keys = Object.keys(all);
    expect(keys.length).toBe(1);
    expect(all[keys[0]].name).toEqual('name');
  })
  
});
