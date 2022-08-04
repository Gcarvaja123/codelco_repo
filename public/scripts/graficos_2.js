var app = angular.module('myApp', ['zingchart-angularjs']);
app.controller('MainController', function($scope) {
  $scope.myJson = {
    type: "pie",
    title: {
      textAlign: 'center',
      text: "My title"
    },
    plot: {
      slice: 50 //to make a donut
    },
    series: [{
      values: [3],
      text: "Total Commits"

    }, {
      values: [4],
      text: "Issues Solved"

    }, {
      values: [8],
      text: "Issues Submitted"
    }, {
      values: [7],
      text: "Number of Clones"

    }]
  };
});