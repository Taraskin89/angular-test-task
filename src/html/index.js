var App = angular.module('App', ['ngRoute']);

// configure our routes
App.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        })
        .when('/albums/all', {
            templateUrl : 'pages/albums.html',
            controller  : 'indexCtrl'
        })
        .when('/albums/count', {
            templateUrl : 'pages/albumsCount.html',
            controller  : 'getCountCtrl'
        })
        .when('/albums/add', {
            templateUrl : 'pages/newAlbum.html',
            controller  : 'addAlbumCtrl'
        })
        .when('/albums/get/:id', {
            templateUrl : 'pages/editAlbum.html',
            controller  : 'updateAlbumCtrl'
        });
});

App.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

App.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

App.controller('contactController', function($scope) {
    $scope.message = 'Contact us! =).';
});

// index controller
App.controller('indexCtrl', function ($scope, $document, $http) {

    var sendRequest = function () {
        $http({
            url: '/albums/all',
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            $scope.data = response.data;
        });
    };

    //get all albums
        $http({
            url: '/albums/all',
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            $scope.albums = response.data;
        });

        //delete album
    $scope.deleteAlbum = function (x) {
        var result = confirm("Are you sure?");
        if(result){
            $http({

                url: '/albums/delete/' + parseInt(x),
                method: "DELETE"

            }).then(function (response) {
                sendRequest();
                alert("Album was deleted!");
                var someAlbum = angular.element($document[0].getElementById(x));
                someAlbum.remove();
            });
        }
        else sendRequest();

    };
});

// filter for sort objects
App.filter('orderObjectBy', function() {
    return function(items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function(item) {
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });
        if(reverse) filtered.reverse();
        return filtered;
    };
});

// get current count albums
App.controller('getCountCtrl', function ($scope, $http) {
        $http({
            url: '/albums/count',
            method: "GET"
        }).then(function (response) {
            $scope.count = response.data.value;
        });
});

// create a new album controller
App.controller('addAlbumCtrl', function ($scope, $http) {

    var sendRequest = function () {
        $http({
            url: '/albums/all',
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {

            $scope.data = response.data;
        });
    };

    // send data for new album
    $scope.sendData = function () {

        $http({
            data: {
                "title": $scope.title,
                "artist": $scope.artist,
                "country": $scope.country,
                "company": $scope.company,
                "price": $scope.price,
                "year": $scope.year
            },
            url: '/albums/add',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {

            sendRequest();
            alert("New album has been saved");
            $scope.title = "";
            $scope.artist = "";
            $scope.country = "";
            $scope.company = "";
            $scope.price = "";
            $scope.year = "";
        });
    }
});

// update current album
App.controller('updateAlbumCtrl', function ($scope, $location, $http) {
    var id = $location.path().split("/")[3]||"Unknown";
    var albumId = parseInt(id);

    var sendRequest = function () {
        $http({
            url: '/albums/all',
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {

            $scope.data = response.data;
        });
    };

    // get current album data
    $http({
        url: '/albums/get/'+ albumId,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        $scope.album = response.data;

        $scope.title = $scope.album.title;
        $scope.artist = $scope.album.artist;
        $scope.country = $scope.album.country;
        $scope.company = $scope.album.company;
        $scope.price = $scope.album.price;
        $scope.year = $scope.album.year;
        $scope.id = $scope.album.id;
    });

    //send new data for current album
    $scope.updateAlbum = function () {
        $http({
            data: {
                "title": $scope.title,
                "artist": $scope.artist,
                "country": $scope.country,
                "company": $scope.company,
                "price": $scope.price,
                "year": $scope.year
            },
            url: '/albums/update/' + albumId,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            sendRequest();
            alert("Changes to the album have been saved!");
        },
        function () {
            alert("Bad request(400)!")
        });
    }
});