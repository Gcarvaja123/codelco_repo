var app = angular.module("MyApp", []);
app.controller("MyController", ['$scope', function ($scope) {
  $scope.Action = "Add";
  $scope.countries = [{ COI_Id: 1, COI_Name: 'India' },
    { COI_Id: 2, COI_Name: 'USA' },
    { COI_Id: 3, COI_Name: 'Canada' },
    { COI_Id: 4, COI_Name: 'Russia'}]
  $scope.Save = function (isValid) {
    if (isValid) {
      // Do Rest of Task.
      // Close Bootstrap Modal Popup.
      angular.element('#popup').modal('hide');
    } else {
      // Show error Message if form is not valid.
        if ($scope.userForm.$error.required != undefined) {
          for (var i = 0; i < $scope.userForm.$error.required.length; i++) {
            $scope.userForm.$error.required[i].$pristine = false;
          }
        }
      }
  }
} 
]);