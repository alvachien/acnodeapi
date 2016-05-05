/* global $ */
/* global angular */
(function () {
    "use strict";

    angular.module('actodoapp.user', ["ui.router", 'ui.bootstrap'])
    
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
		        .state('home.users', {
                    url: '/users',
                    abstract: true,
                    template: '<div ui-view></div>'
                })
		        .state('home.users.list', {
                    url: '',
                    templateUrl: 'view/users/userlist.html',
                    controller: 'UserListController'
                })
		        .state('home.users.login', {
                    url: '',
                    templateUrl: 'view/users/login.html',
                    controller: 'UserLoginController'
                })
                .state('home.users.register', {
                    url: '/register',
                    templateUrl: 'view/users/register.html',
                    controller: 'UserRegisterController'
                })
                .state('home.users.detail', {
                    url: '/detail',
                    templateUrl: 'view/users/detail.html'
                });
        }])
        
	.controller('UserListController', ['$scope', '$rootScope', '$state', '$http', '$log', function ($scope, $rootScope, $state, $http, $log) {
        }])

	.controller('UserRegisterController', ['$scope', '$rootScope', '$state', '$http', '$log', function ($scope, $rootScope, $state, $http, $log) {
            $scope.registerInfo = new acnodeapi.UserRegisterInfo();
            $scope.ProgressClass = "progress-bar progress-bar-danger";
            $scope.regGender = "0";

            $scope.$watch('registerInfo', function (newVal, oldVal) {
                if (newVal.Password !== oldVal.Password) {
                    var nLevel = acnodeapi.Utility.CheckPasswordStrength(newVal.Password);
                    if (nLevel == acnodeapi.Utility.LoginPasswordLength.VeryStrong)
                        $scope.PasswordStrengthValue = 100;
                        $scope.ProgressClass = "progress-bar progress-bar-success";                        
                    } else if (nLevel === acnodeapi.Utility.LoginPasswordLength.Strong) {
                        $scope.PasswordStrengthValue = 80;
                        $scope.ProgressClass = "progress-bar progress-bar-info";
                    } else if (nLevel === acnodeapi.Utility.LoginPasswordLength.Normal) {
                        $scope.PasswordStrengthValue = 60;
                        $scope.ProgressClass = "progress-bar progress-bar-warning";
                    } else if (nLevel === acnodeapi.Utility.LoginPasswordLength.Weak) {
                        $scope.PasswordStrengthValue = 30;
                        $scope.ProgressClass = "progress-bar progress-bar-danger";
                    } else {
                        $scope.PasswordStrengthValue = 0;
                        $scope.ProgressClass = "progress-bar progress-bar-danger";
                    }
                }, true);

            $scope.submitRegister = function () {
                // Handle the submit event
                $scope.registerInfo.Gender = parseInt($scope.regGender);

                // Perform the checks.
                if (!$scope.registerInfo.IsValid()) {
                    return;
                }

                // Now the real submit
                $http.post('/api/user', $scope.registerInfo)
                    .then(function (response) {
                    }, function (reason) { 
                    });
            }
        }])

	.controller('UserLoginController', ['$scope', '$rootScope', '$state', '$http', '$log', function ($scope, $rootScope, $state, $http, $log) {
            $scope.registerInfo = new UserRegisterInfo();

        }])
}());