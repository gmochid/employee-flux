
jest.autoMockOff();

describe('EmployeeAction', function(){

  var EmployeeAction;
  var EmployeeStore;
  var testEmployee = {
    id: 'replacable',
    name: 'John Snow',
    address: 'Winterfell',
    telephone: '123'
  }
  
  beforeEach(function() {
    EmployeeAction = require('../EmployeeActions');
    EmployeeStore = require('../../store/EmployeeStore');
  });
  
  it('creates an employee', function() {
    EmployeeAction.create(testEmployee.name, testEmployee.address, testEmployee.telephone);
    var all = EmployeeStore.getAll();
    var keys = Object.keys(all);
    testEmployee.id = keys[0];
    expect(keys.length).toBe(1);
    expect(all[keys[0]]).toEqual(testEmployee);
  });

  it('deletes an employee', function() {
    EmployeeAction.create(testEmployee.name, testEmployee.address, testEmployee.telephone);
    var all = EmployeeStore.getAll();
    var keys = Object.keys(all);
    testEmployee.id = keys[0];
    expect(keys.length).toBe(1);
    expect(all[keys[0]]).toEqual(testEmployee);
    
    EmployeeAction.delete(keys[0]);
    expect(all[keys[0]]).toBeUndefined();
  });
  
  it('doesnt delete employee if the given id is false', function() {
    EmployeeAction.create(testEmployee.name, testEmployee.address, testEmployee.telephone);
    var all = EmployeeStore.getAll();
    var keys = Object.keys(all);
    testEmployee.id = keys[0];
    expect(keys.length).toBe(1);
    expect(all[keys[0]]).toEqual(testEmployee);
    
    EmployeeAction.delete('Anything');
    keys = Object.keys(all);
    expect(keys.length).toBe(1);
  });
  
  it('updates an employee', function() {
    EmployeeAction.create(testEmployee.name, testEmployee.address, testEmployee.telephone);
    var all = EmployeeStore.getAll();
    var keys = Object.keys(all);
    testEmployee.id = keys[0];
    expect(keys.length).toBe(1);
    expect(all[keys[0]]).toEqual(testEmployee);
    
    testEmployee.name = 'John Doe';
    testEmployee.address = 'England';
    testEmployee.telephone = '456';
    
    EmployeeAction.update(testEmployee);
    keys = Object.keys(all);
    expect(keys.length).toBe(1);
    expect(all[keys[0]]).toEqual(testEmployee);
  });
})
