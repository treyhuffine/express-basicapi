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
  $scope.submitQuote = function() {
    $http.post("/quotes", { quote: $scope.newQuote })
      .success(function(data, status, headers, config) {
        $scope.quotes.push(data.quote);
        $scope.newQuote = "";
      })
      .error(function(data, status, headers, config) {
        console.log("Error");
      });
  };
});
