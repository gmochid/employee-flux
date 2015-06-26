
jest.dontMock('../../constants/EmployeeConstants');
jest.dontMock('../EmployeeStore');
jest.dontMock('object-assign');

describe('EmployeeStore', function() {
  
  var EmployeeConstants = require('../../constants/EmployeeConstants');
  var AppDispatcher;
  var EmployeeStore;
  var callback;
  var testEmployee = {
    id: 'replacable',
    name: 'John Snow',
    address: 'Winterfell',
    telephone: '123'
  }
  
  var actionEmployeeCreate = {
    actionType: EmployeeConstants.EMPLOYEE_CREATE,
		name: testEmployee.name,
		address: testEmployee.address,
		telephone: testEmployee.telephone
  };
  
  var actionEmployeeDelete = {
    actionType: EmployeeConstants.EMPLOYEE_DESTROY,
		id: null
  };
  
  var actionEmployeeUpdate = {
    actionType: EmployeeConstants.EMPLOYEE_UPDATE,
    id: null,
		employee : null
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
    
    testEmployee.id = keys[0];
    expect(all[keys[0]]).toEqual(testEmployee);
  });
  
  it('deletes an employee', function() {
    callback(actionEmployeeCreate);
    var all = EmployeeStore.getAll();
    var keys = Object.keys(all);
    testEmployee.id = keys[0];
    expect(keys.length).toBe(1);
    expect(all[keys[0]]).toEqual(testEmployee);
    
    actionEmployeeDelete.id = keys[0];
    callback(actionEmployeeDelete);
    keys = Object.keys(all);
    expect(keys.length).toBe(0);
  });
  
  it('doesnt delete employee if the given id is false', function() {
    callback(actionEmployeeCreate);
    var all = EmployeeStore.getAll();
    var keys = Object.keys(all);
    testEmployee.id = keys[0];
    expect(keys.length).toBe(1);
    expect(all[keys[0]]).toEqual(testEmployee);
    
    actionEmployeeDelete.id = 'Anything';
    callback(actionEmployeeDelete);
    keys = Object.keys(all);
    expect(keys.length).toBe(1);
  });
  
  it('updates an employee', function() {
    callback(actionEmployeeCreate);
    var all = EmployeeStore.getAll();
    var keys = Object.keys(all);
    testEmployee.id = keys[0];
    expect(keys.length).toBe(1);
    expect(all[keys[0]]).toEqual(testEmployee);
    
    testEmployee.name = 'John Doe';
    testEmployee.address = 'England';
    testEmployee.telephone = '456';
    
    actionEmployeeUpdate.id = testEmployee.id;
    actionEmployeeUpdate.employee = testEmployee;
    callback(actionEmployeeUpdate);
    keys = Object.keys(all);
    expect(keys.length).toBe(1);
    expect(all[keys[0]]).toEqual(testEmployee);
  });
  
});
