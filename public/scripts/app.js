var coverApp = angular.module('coverApp', ['ngCookies', 'ui.router', 'slickCarousel', 'ngMessages', 'ui.bootstrap', 'ngTagsInput', 'ngImageInputWithPreview']);

coverApp.constant("BASEURL", "http://staging.locumapp.com/");


coverApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
            /* HOME STATES AND NESTED VIEWS */
            .state('home', {
                url: '/',
                controller: 'HomeController',
                templateUrl: 'views/home/home.html',
            })
            .state('doctor', {
                url: '/doctor',
                controller: 'HomeController',
                templateUrl: 'views/home/doctor.html',
            })
            .state('employer', {
                url: '/employer',
                controller: 'HomeController',
                templateUrl: 'views/home/employer.html',
            })
            // Employer signup  =================================
            .state('employer_signup', {
                url: '/employer/signup',
                controller: 'UsersController',
                templateUrl: 'views/users/employer_signup.html'
            })
            .state('employer_signup_step2', {
                url: '/employer/step2/:id',
                controller: 'UsersController',
                templateUrl: 'views/users/employer_signup_step2.html'
            })
            .state('dashboard_doctor', {
                url: '/doctor/dashboard',
                controller: 'DashboardController',
                templateUrl: 'views/dashboard/dashboard_doctor.html',
            })
            .state('dashboard_employer', {
                url: '/employer/dashboard',
                controller: 'DashboardController',
                templateUrl: 'views/dashboard/dashboard_employer.html'
            })
            .state('doctor_signup', {
                url: '/doctor/signup',
                controller: 'UsersController',
                templateUrl: 'views/users/doctor_signup.html',
                //params: {action: {value: "views/users/doctor_signup.html"}}
            })
            .state('doctor_signup_step2', {
                url: '/doctor/step2/:id',
                controller: 'UsersController',
                templateUrl: 'views/users/doctor_signup_step2.html'
            })
            .state('doctor_signup_step3', {
                url: '/doctor/step3/:id',
                controller: 'UsersController',
                templateUrl: 'views/users/doctor_signup_step3.html'
            })
            .state('doctor_step4', {
                url: '/doctor/step4/:id',
                controller: 'UsersController',
                templateUrl: 'views/users/doctor_signup_step4.html'
            })
            .state('doctor_signup_step5', {
                url: '/doctor/step5/:id',
                controller: 'UsersController',
                templateUrl: 'views/users/doctor_signup_step5.html'
            })
            .state('forgot_password', {
                url: '/forgot_password',
                controller: 'UsersController',
                templateUrl: 'views/users/forgot_password.html'
            })
            .state('reset_password', {
                url: '/reset_password/:id/:token',
                controller: 'UsersController',
                templateUrl: 'views/users/reset_password.html'
            })
            .state('error_404', {
                url: '/error_404',
                controller: 'HomeController',
                templateUrl: 'views/home/error_404.html'
            })

            //////////////////////////////////////////PAGES CONTROLLER//////////////////////////
            .state('contactus', {
                url: '/contactus',
                controller: 'PagesController',
                templateUrl: 'views/pages/contact_us.html'
            })
            //////////////////////////////////////////PAGES CONTROLLER//////////////////////////
            .state('references', {
                url: '/references/:id',
                controller: 'UsersController',
                templateUrl: 'views/users/references.html'
            })

            ////////////////////////////////////////FEEDBACK SECTION//////////////////
            .state('feedbacks', {
                url: '/feedbacks',
                controller: 'UsersController',
                templateUrl: 'views/users/feedbacks.html'
            })

    // $stateProvider.html5Mode(true);
});

coverApp.controller('ModalDemoCtrl', function ($scope, $uibModal) {
    $scope.animationsEnabled = true;
    $scope.open = function () {
        $uibModal.open({
            templateUrl: 'views/elements/login_model.html',
            controller: 'ModalInstanceCtrl',
            windowClass: 'loginModalTopClass',
        });
    };

    $scope.open_reference_modal = function () {
        $uibModal.open({
            templateUrl: 'views/elements/open_reference_modal.html',
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



    $scope.resendAnotherReference = function () {
        $scope.loading = true;
        var user_data = CommonServices.isLoggedIn();
        CommonServices.requestAnotherReference($scope.feedback, user_data['id'], function (result) {
            $scope.loading = false;
            if (result.message == "success") {
                $scope.feedback_error_reference = {'success': true, 'result': result.response};
                $scope.ok();
                $timeout(function () {
                    angular.element('#trigger_reference_form').triggerHandler('click');
                }, 1000);
            } else {
                $scope.feedback_error_reference = {'success': false, 'result': result.response};
            }
        });
    };



});

coverApp.directive('slideToggle', function () {
    return {
        restrict: 'A',
        scope: {},
        controller: function ($scope) {},
        link: function (scope, element, attr) {
            element.bind('click', function () {
                //element.addClass("opened");
                var $slideBox = angular.element(attr.slideToggle);
                var slideDuration = parseInt(attr.slideToggleDuration, 10) || 400;
                $slideBox.stop().slideToggle(slideDuration);
                if (element.hasClass("discardbtn")) {
                    //element.removeClass("hide");
                    element.parent().parent().prev().find('feedback_btn.').removeClass('feedbackopened');
                } else if (element.hasClass("feedback_btn")) {
                    element.toggleClass("feedbackopened");
                } else if (element.hasClass("ref_toggleicon")) {
                    element.toggleClass("opened");
                } else {
                    element.removeClass("opened");
                    //if(element.hasClass("discardbtn")) {
                    //  element.removeClass("opened hide");
                    //}
                }
            });
        }
    };
});