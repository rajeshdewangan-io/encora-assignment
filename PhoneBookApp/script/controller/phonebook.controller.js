app.controller('phonebookcontroller', function ($scope, $http) {
    $scope.phoneBook = null;
    $scope.phoneBooks = [];
    $scope.submitted = false;
    $scope.sync = function () {
        $scope.phoneBooks = [];
        $http({
            method: 'GET',
            url: 'https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts',
            data: 'parameters'
        }).then(function success(response) {
            response.data.forEach(phone => {
                $scope.phoneBooks.push(phone);
            });
        }, function error(response) { })
    }
    $scope.sync();

    $scope.add = function () {
        $scope.submitted = true;
        if($scope.bookForm.$invalid) return;
        var book= $scope.phoneBooks.filter((phone) => phone.id === $scope.phoneBook.id)[0];
        if ($scope.phoneBook.id != null && $scope.phoneBook.id > 0 && book) {
            book.firstName=$scope.phoneBook.firstName;
            book.lastName=$scope.phoneBook.lastName;
            book.phone=$scope.phoneBook.phone;
        }
        else {
            var id = $scope.phoneBooks.length==0?1:$scope.phoneBooks[$scope.phoneBooks.length - 1].id + 1;
            $scope.phoneBook.id = id;
            $scope.phoneBooks.push($scope.phoneBook);
        }

        $scope.phoneBook = null;
        $scope.bookForm.$setUntouched();
        $scope.bookForm.$setPristine();
        $scope.submitted = false;
    };

    $scope.edit = function (id) {
        $scope.phoneBook=angular.copy($scope.phoneBooks.filter((phone) => phone.id === id)[0])
    };

    $scope.delete =function(id){
       var index=$scope.phoneBooks.findIndex((phone) => phone.id === id);
       $scope.phoneBooks.splice(index,1);
    }
});