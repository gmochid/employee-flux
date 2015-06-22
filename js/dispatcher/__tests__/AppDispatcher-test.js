"use strict";

jest.autoMockOff();

describe('AppDispatcher', function() {
  var AppDispatcher;
  
  beforeEach(function(){
    AppDispatcher = require("../AppDispatcher");
  });
  
  it('sends actions to listeners', function() {
    var listener = jest.genMockFunction();
    var listener2 = jest.genMockFunction();
    var payload = {
      payload : "content"
    };
    var payload2 = {
      anotherPayload : "another content"
    }
    
    AppDispatcher.register(listener);
    AppDispatcher.dispatch(payload);
    
    expect(listener.mock.calls.length).toBe(1);
    expect(listener.mock.calls[0][0]).toBe(payload);
    
    AppDispatcher.register(listener2);
    AppDispatcher.dispatch(payload2);
    
    expect(listener.mock.calls.length).toBe(2);
    expect(listener.mock.calls[1][0]).toBe(payload2);
    
    expect(listener2.mock.calls.length).toBe(1);
    expect(listener2.mock.calls[0][0]).toBe(payload2);
  });
  
  it('waits chained dependency properly', function() {
    var payload = {
      key : 'value'
    };
    
    var listener1Done = false;
    var listener2Done = false;
    var listener3Done = false;
    var listener4Done = false;
    
    var listener1 = function(param) {
      AppDispatcher.waitFor([index2, index4]);
      expect(listener2Done).toBe(true);
      expect(listener3Done).toBe(true);
      expect(listener4Done).toBe(true);
      listener1Done = true;
    }
    var listener2 = function(param) {
      AppDispatcher.waitFor([index3]);
      expect(listener3Done).toBe(true);
      listener2Done = true;
    }
    var listener3 = function(param) {
      listener3Done = true;
    }
    var listener4 = function(param) {
      AppDispatcher.waitFor([index2]);
      expect(listener2Done).toBe(true);
      expect(listener3Done).toBe(true);
      listener4Done = true;
    }
    
    var index1 = AppDispatcher.register(listener1);
    var index2 = AppDispatcher.register(listener2);
    var index3 = AppDispatcher.register(listener3);
    var index4 = AppDispatcher.register(listener4);
    
    runs(function() {
      AppDispatcher.dispatch(payload);
    });
    
    waitsFor(function() {
      return listener1Done;
    }, "Not all subscribers were properly called", 500);
    
    runs(function() {
      expect(listener1Done).toBe(true);
      expect(listener2Done).toBe(true);
      expect(listener3Done).toBe(true);
    });
  });
});
