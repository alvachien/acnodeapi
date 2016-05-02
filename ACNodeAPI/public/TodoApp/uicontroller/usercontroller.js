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
            $scope.registerInfo = new acToDo.UserRegisterInfo();
            $scope.ProgressClass = "progress-bar progress-bar-danger";
            $scope.regGender = "0";

            $scope.$watch('registerInfo', function (newVal, oldVal) {
                if (newVal.Password !== oldVal.Password) {
                    var nLevel = hih.ModelUtility.CheckPasswordStrength(newVal.Password);
                    if (nLevel === hih.Constants.Login_PwdStrgth_VeryStrong) {
                        $scope.PasswordStrengthValue = 100;
                        $scope.ProgressClass = "progress-bar progress-bar-success";                        
                    } else if (nLevel === hih.Constants.Login_PwdStrgth_Strong) {
                        $scope.PasswordStrengthValue = 80;
                        $scope.ProgressClass = "progress-bar progress-bar-info";
                    } else if (nLevel === hih.Constants.Login_PwdStrgth_Normal) {
                        $scope.PasswordStrengthValue = 60;
                        $scope.ProgressClass = "progress-bar progress-bar-warning";
                    } else if (nLevel === hih.Constants.Login_PwdStrgth_Weak) {
                        $scope.PasswordStrengthValue = 30;
                        $scope.ProgressClass = "progress-bar progress-bar-danger";
                    } else {
                        $scope.PasswordStrengthValue = 0;
                        $scope.ProgressClass = "progress-bar progress-bar-danger";
                    }
                }
            }, true);

            $scope.submitRegister = function () {
                // Handle the submit event
                $scope.registerInfo.Gender = parseInt($scope.regGender);
            }
        }])

	.controller('UserLoginController', ['$scope', '$rootScope', '$state', '$http', '$log', function ($scope, $rootScope, $state, $http, $log) {
            $scope.registerInfo = new UserRegisterInfo();


        }])
}());