'use strict';

describe('Controller: ValiseCtrl', function () {

  // load the controller's module
  beforeEach(module('valiseApp'));

  var ValiseCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ValiseCtrl = $controller('ValiseCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
