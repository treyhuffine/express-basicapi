var quotesApp = angular.module("quotesApp", []);

quotesApp.controller("QuotesCtrl", function($scope, $http) {
  $scope.hello = "Hello world";
  $scope.quotes = [];
  $http.get("/quotes")
    .success(function(data, status, headers, config) {
      console.log("Data: ", data);
      $scope.quotes = data.quotes;
    })
    .error(function(data, status, headers, config) {
      console.log("error");
    });
});
