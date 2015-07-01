var quotesApp = angular.module("quotesApp", []);

quotesApp.controller("QuotesCtrl", function($scope, $http) {
  $scope.hello = "Hello world";
  $scope.quotes = [];
  $http.get("/quotes")
    .success(function(data, status, headers, config) {
      $scope.quotes = data.quotes;
    })
    .error(function(data, status, headers, config) {
      console.log("error");
  });
  $scope.submitQuote = function() {
    $scope.formError = "";
    $http.post("/quotes", { quote: $scope.newQuote })
      .success(function(data, status, headers, config) {
        $scope.quotes.push(data.quote);
        $scope.newQuote = "";
      })
      .catch(function(err) {
        console.log(err);
        $scope.formError = err.data;
      });
  };
  $scope.deleteQuote = function(idx) {
    var delPost = confirm("Delete post?");
    if (delPost) {
      //$scope.quotes.splice(idx,1);
      $http.delete("/quotes/" + idx)
        .success(function(data, status, headers, config) {
          $scope.quotes.splice(data.deletedIdx, 1);
        })
        .catch(function(err) {
          console.log(err);
          $scope.formError = err.data;
        });
    }
  };
});
