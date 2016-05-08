var coverApp = angular.module('coverApp', ['ngCookies', 'ui.router', 'ngMessages', 'ui.bootstrap','multipleDatePicker']);
coverApp.constant("BASEURL", "http://staging.cover");
coverApp.config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
                url: '/',
                controller: 'HomeController',
                templateUrl: 'views/home/home.html',
                authenticate: true
            })
            .state('users', {
                url: '/users',
                controller: 'UsersController',
                templateUrl: 'views/users/index.html',
                authenticate: true
            })
            .state('adduser', {
                url: '/adduser',
                controller: 'UsersController',
                templateUrl: 'views/users/adduser.html',
                authenticate: true
            })
            .state('error_404', {
                url: '/error_404',
                controller: 'HomeController',
                templateUrl: 'views/home/error_404.html'
            })



    // $stateProvider.html5Mode(true);
}) 


coverApp.controller('ModalDemoCtrl', function ($scope, $uibModal) {
    $scope.animationsEnabled = true;
    $scope.open = function () {
        $uibModal.open({
            templateUrl: 'views/elements/login_model.html',
            controller: 'ModalInstanceCtrl',
            windowClass: 'loginModalTopClass',
        });
    };
});
coverApp.controller('HeaderCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        var path = $location.path().split('/');
        return viewLocation === "/" + path[1];
    };
});

coverApp.controller('ModalInstanceCtrl', function ($http, $scope, $state, $uibModalInstance, CommonServices, $cookieStore, $timeout) {
    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.login = function () {
        CommonServices.loginPopup($scope.User, function (response) {
            if (response.data.response == "success") {
                $scope.user_data = response.data.message;
                if ($scope.user_data.user_type == 2) {
                    var completed_steps = CommonServices.stepCompleted($scope.user_data.user_type, $scope.user_data.steps_completed);
                    $state.go('' + completed_steps + '', {id: $scope.user_data.id});
                    $uibModalInstance.close();
                }
                if ($scope.user_data.user_type == 3) {
                    var completed_steps = CommonServices.stepCompleted($scope.user_data.user_type, $scope.user_data.steps_completed);
                    $state.go('' + completed_steps + '', {id: $scope.user_data.id});
                    $uibModalInstance.close();
                }
                $cookieStore.put('user_data', response.data.message);
            } else {
                $scope.login_error = response.data.message;
            }
        });
    };




});



