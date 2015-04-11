'use strict';

angular.module('valiseApp')
  .controller('ValiseCtrl', function ($scope, config) {
    $scope.valises = config.valises;
    $scope.badge = false;
    $scope.valise = $scope.valises[0];
    $scope.amount = '1';
    $scope.denominations =  config.denominations;
    $scope.denomination = $scope.denominations[1];
    $scope.multiplier = 1;
    $scope.update = function(){
      if(isNaN($scope.amount)){
        return $scope.error =  "Enter a number";
      }
      var ret = {};
      var tmpDenominations = config.denominations.map(function(o){return o.value}).filter(function(el){
        return el <= $scope.denomination.value;
      });
      var tmpSum = 0;
      var remainder = $scope.amount;
      for(var i = 0; i < tmpDenominations.length; i++){
        ret[tmpDenominations[i]] = Math.floor(remainder/tmpDenominations[i]);
        tmpSum += Math.floor(remainder/tmpDenominations[i]);
        remainder = remainder % tmpDenominations[i];
      }
      console.log(tmpSum);
      $scope.bills = ret;
      $scope.totalBills = tmpSum;
      $scope.dollarSqIn = config.dollar * tmpSum;
      $scope.totalValises =  Math.ceil($scope.dollarSqIn / $scope.valise.value);
      $scope.displayValiseTotal = function () {
        var ret = $scope.totalValises;
        $scope.multiplier = 1;
        while(ret > 100){
          ret = ret/100;
          $scope.multiplier = $scope.multiplier * 100;

        }
        return Math.floor(ret);
      }
      $scope.getTotalValises = function () {
        return new Array($scope.displayValiseTotal());
      }
    }

    $scope.update();
  });

