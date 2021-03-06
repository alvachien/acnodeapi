﻿/* global $ */
/* global angular */
(function () {
    "use strict";
    
    angular.module('acNoteApp', ["ui.router", 'ui.bootstrap'])        
		.run(['$rootScope', '$state', '$stateParams', '$timeout', '$http', '$log', 
        function ($rootScope, $state, $stateParams, $timeout, $http, $log) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            
            //$.ajax({
            //    async: false,  
            //    type: "GET",  
            //    url: "script/hihsrv.php",  
            //    data: { objecttype : 'GETCURRENTUSER' },  
            //    success: function (response) {
            //        if (response.type === "S" && response.UserID.length > 0) {
            //            $rootScope.isLogin = true;
            //            $rootScope.CurrentUser = {
            //                userid          : response.UserID,
            //                userdisplayas   : response.UserDisplayAs,
            //                usercreatedon   : response.UserCreatedOn,
            //                usergender      : response.UserGender
            //            };
            //            var arProfiles = JSON && JSON.parse(response.UserProfile);
            //            $rootScope.CurrentUser.Profiles = {};
            //            if ($.isArray(arProfiles) && arProfiles.length > 0) {
            //                $.each(arProfiles, function (idx, obj) {
            //                    $rootScope.CurrentUser.Profiles[obj.Module] = {};
            //                    $rootScope.CurrentUser.Profiles[obj.Module].ReadFlag = (parseInt(obj.ReadFlag) === 1);
            //                    $rootScope.CurrentUser.Profiles[obj.Module].CreateFlag = (parseInt(obj.CreateFlag) === 1);
            //                    $rootScope.CurrentUser.Profiles[obj.Module].UpdateFlag = (parseInt(obj.UpdateFlag) === 1);
            //                    $rootScope.CurrentUser.Profiles[obj.Module].FullControlFlag = (parseInt(obj.FullControlFlag) === 1);
            //                });
            //                // // For testing
            //                // $rootScope.CurrentUser.Profiles.USR.ReadFlag = false;
            //                // $rootScope.CurrentUser.Profiles.LRN.ReadFlag = false;
            //            }
            //        }
            //    }
            //});
            
            $rootScope.$on('$stateChangeStart', 
		        function (event, toState, toParams, fromState, fromParams) {
                    //$log.info('HIH: state change start, target url is ' + toState.url + "; state is " + toState.name);
                
                    //if (toState.name === 'login' || toState.name === 'register') {
                    //    if (angular.isDefined($rootScope.isLogin) && $rootScope.isLogin) {
                    //        $log.info('HIH: state change failed: already login but ask for login page, redirect to home page...');
                    //        event.preventDefault();
                    //        $state.go("home.welcome");
                    //    }
                    //    return;
                    //}
                
                    //if (angular.isDefined($rootScope.isLogin) && $rootScope.isLogin) {
                    //    return;
                    //}
                
                    //$log.info('HIH: state change failed: not login, redirect to login page...');
                    //event.preventDefault();
                    //$state.go("login");
                }
            );
        }])

	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider ) {
            
            /////////////////////////////
            // Redirects and Otherwise //
            /////////////////////////////
            
            // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
            $urlRouterProvider
                .when('/welcome', '/home')
                .when('/about', '/home/about')
                .when('/userdetail', '/home/userdetail')
                .when('/todo', '/home/todo')
                .otherwise('/home');
            
            //////////////////////////
            // State Configurations //
            //////////////////////////
            
            // Use $stateProvider to configure your states.
            $stateProvider
                .state("home", {
                        url: "/home",
                        abstract: true,
                        templateUrl: 'view/home.html',
                        controller: 'HomeController',
                        data: {
                            rule: function ($rootScope) {
                                if (!angular.isDefined($rootScope.isLogin)) return false;
                        
                                return $rootScope.isLogin;
                            }
                        },
                
                        onEnter: function ($rootScope) {
                            console.log('Entering page!');
                        }
                    })
                .state('home.welcome', {
                        url: '',
                        templateUrl: 'view/welcome.html'
                    })
		        .state('home.userlist', {
                        url: '/userlist',
                        templateUrl: 'view/userlist.html',
                        controller: 'UserListController'
                    })
                .state('home.userdetail', {
                        url: '/userdetail',
                        templateUrl: 'view/userdetail.html'
                    })
                .state('home.about', {
                        url: '/about',
                        templateUrl: 'view/about.html',
                        controller: 'AboutController'
                    })
                .state('home.todo', {
                        url: '/todo',
                        templateUrl: 'view/todo.html',
                        controller: 'TodoController'
                    });
            
    //        // Translate configurations
    //        $translateProvider.useStaticFilesLoader({
    //            files: [{
    //                    prefix: 'locales/',
    //                    suffix: '.json'
    //                }]
    //        });
            
    //        // Enable escaping of HTML
    //        $translateProvider.useSanitizeValueStrategy('escaped');
    //        $translateProvider.registerAvailableLanguageKeys(['en', 'zh'], {
    //            'en_US': 'en',
    //            'en_UK': 'en',
    //            'zh_CN': 'zh',
    //            'zh-CN': 'zh'
    //        })
		  //.determinePreferredLanguage()
		  ////.preferredLanguage('zh')
		  //.fallbackLanguage('en');
        }])
	
	.controller('MainController', ['$scope', '$rootScope', '$log', '$uibModal',
        function ($scope, $rootScope, $log, $uibModal) {
     //       $scope.currentTheme = "lumen"; // Default theme: , readable
            
     //       var arCSS = utils.getThemeCSSPath($scope.currentTheme);
     //       $scope.bootstrapcss = arCSS[0];
     //       $scope.bootstrap_defaultcss = arCSS[1];
            
     //       $scope.$on('ThemeChange', function (oEvent, newtheme) {
     //           $log.info('HIH: Theme has changed!');
                
     //           if ($scope.currentTheme !== newtheme) {
     //               $scope.currentTheme = newtheme;
                    
     //               var arCSS = utils.getThemeCSSPath($scope.currentTheme);
     //               $scope.bootstrapcss = arCSS[0];
     //               $scope.bootstrap_defaultcss = arCSS[1];
     //           }
     //       });
            
     //       $scope.$on('ShowMessage', function (oEvent, msgHeader, msgDetail, msgType, conf_func) {
     //           $log.info('HIH: ShowMessage event occurred');
     //           $log.info("HIH Show message: header: " + msgHeader + "; detail: " + msgDetail);
                
     //           if (conf_func && angular.isFunction(conf_func)) {
     //               window.swal({
     //                   title: msgHeader,   
     //                   text: msgDetail,   
     //                   type: msgType || "warning", 
     //                   showCancelButton: true, 
     //                   confirmButtonColor: "#DD6B55", 
     //                   confirmButtonText: "Yes, delete it!", 
     //                   closeOnConfirm: true
     //               }, 
					//conf_func
     //               );
     //           } else {
     //               window.swal(msgHeader, msgDetail, msgType || "error");
     //           }
     //       });
            
     //       $scope.$on('ShowMessageNeedTranslate', function (oEvent, msgHeaderStr, msgDetailStr, msgType, conf_func) {
     //           $log.info('HIH: ShowMessageNeedTranslate event occurred');
     //           $log.info("HIH Show message: header: " + msgHeaderStr + "; detail: " + msgDetailStr);
                
     //           $translate([msgHeaderStr, msgDetailStr]).then(function (translations) {
     //               var hdr = translations[msgHeaderStr];
     //               var dtal = translations[msgDetailStr];
                    
     //               if (conf_func && angular.isFunction(conf_func)) {
     //                   window.swal({
     //                       title: hdr,   
     //                       text: dtal,   
     //                       type: msgType || "warning", 
     //                       showCancelButton: true, 
     //                       confirmButtonColor: "#DD6B55", 
     //                       confirmButtonText: "Yes, delete it!", 
     //                       closeOnConfirm: true
     //                   }, 
					//			conf_func
     //                   );
     //               } else {
     //                   window.swal(hdr, dtal, msgType || "error");
     //               }
     //           });
     //       });
            
     //       $scope.$on('ShowMessageEx', function (oEvent, TitleStr, Details, AfterProcFunc) {
     //           var modalInstance = $uibModal.open({
     //               animation: true,
     //               templateUrl: 'app/views/modaldlg.html',
     //               controller: 'PopupDialogController',
     //               size: 'lg',
     //               backdrop: 'static',
     //               resolve: {
     //                   TitleStr: function () { return TitleStr; },
     //                   Details: function () { return Details; }
     //               }
     //           });
                
     //           modalInstance.result.then(function (bOK) {
     //               $log.info("HIH Modal: closed by OK button: " + new Date());
     //               if (AfterProcFunc && angular.isFunction(AfterProcFunc)) {
     //                   $log.info("HIH Popup: running AfterProcFunc ....");
     //                   AfterProcFunc();
     //               }
     //           }, function () {
     //               $log.info("HIH Modal: dismissed by Cancel button: " + new Date());
     //           });
     //       });
        }])
	
	.controller('HomeController', ['$scope', '$rootScope', '$state', '$stateParams', '$http', '$log', '$q', 
        function ($scope, $rootScope, $state, $stateParams, $http, $log, $q) {
            $scope.CurrentUser = $rootScope.CurrentUser;
            
            // Load the finance setting out
   //         utils.loadFinanceSettingQ()
			//.then(function (response) {
			//	// Do nothing here~~~
   //         }, function (reason) {
   //             $log.error(reason);
   //             $rootScope.$broadcast("ShowMessageEx", "Error", [{ Type: 'danger', Message: reason }]);
   //         });
   //         utils.loadFinanceExchangeRateInfoQ()
			//.then(function (response) {
			//	// Do nothing here~~~
   //         }, function (reason) {
   //             $log.error(reason);
   //             $rootScope.$broadcast("ShowMessageEx", "Error", [{ Type: 'danger', Message: reason }]);
   //         });
   //         utils.loadLibSettingQ()
			//.then(function (response) {
			//	// Do nothing here~~~
   //         }, function (reason) {
   //             $log.error(reason);
   //             $rootScope.$broadcast("ShowMessageEx", "Error", [{ Type: 'danger', Message: reason }]);
   //         });
            
            // Welcome page
            $scope.listUsrAct = [];
   //         utils.loadUserLogListQ()
			//.then(function (response) {
   //             // Do nothing
   //             var nCount1 = 0;
   //             var nCount2 = 0;
   //             var dtLast = null;
   //             var dtLastWeek = new Date();
   //             dtLastWeek.setDate(dtLastWeek.getDate() - 7);
   //             var dtLastMonth = new Date();
   //             dtLastMonth.setDate(dtLastMonth.getDate() - 30);
                
   //             $.each($rootScope.arUserLogList, function (idx, obj) {
   //                 if (!dtLast) {
   //                     dtLast = obj.TimePoint;
   //                 } else {
   //                     if (dtLast < obj.TimePoint) {
   //                         dtLast = obj.TimePoint;
   //                     }
   //                 }
                    
   //                 if (obj.LogType === hih.Constants.UserHistType_Login) {
   //                     if (obj.TimePoint > dtLastWeek) nCount1++;
   //                     if (obj.TimePoint > dtLastMonth) nCount2++;
   //                 }
   //             });
   //             $scope.listUsrAct = [
   //                 { Activity: 'Count of logins in last week', Detail: nCount1 },
   //                 { Activity: 'Count of logins in last month', Detail: nCount2 },
   //                 { Activity: 'Last login time', Detail: dtLast }
   //             ];
   //         }, function (reason) {
			//	// Do nothing either!
   //         });
            
            $scope.goDetail = function (row) {
                //if (row.AccountID) {
                //    // Go to the downpayment relevant doc
                //    $state.go('home.finance.document.dptmpdoc_post', { docid: row.DPTempID });
                //} else {
                //    var q1 = utils.loadUserListQ();
                //    var q2 = utils.loadLearnCategoriesQ();
                //    $q.all([q1, q2])
                //    .then(function (response) {
                //        utils.loadLearnObjectsQ()
                //            .then(function (response2) {
                //            $state.go('home.learn.history.create');
                //        }, function (reason2) {
                //            $rootScope.$broadcast("ShowMessageEx", "Error", [{ Type: 'danger', Message: reason2 }]);
                //        });
                        
                //    }, function (reason) {
                //        $rootScope.$broadcast("ShowMessageEx", "Error", [{ Type: 'danger', Message: reason }]);
                //    });
                //}
            };
            $scope.refreshTodo = function () {
                $scope.listModInfo = [];
                
    //            utils.getAccountListForDownPaymentQ()
				//.then(function (response) {
    //                for (var i = 0; i < response.length; i++) {
    //                    var modinfo = {
    //                        Module: 'FI Downpayment',
    //                        Date: response[i].trandate,
    //                        Detail: "Account: " + response[i].accountname + "; Amount: " + response[i].tranamount ,
    //                        AccountID: response[i].accountid,
    //                        DPTempID: response[i].tmpdocid
    //                    };
    //                    $scope.listModInfo.push(modinfo);
    //                }
    //            }, function (reason) {
				//	// Error dialog?
				//	// ToDo
    //            });

    //            utils.getLearnPlanActListQ()
    //            .then(function (response) {
    //                for (var i = 0; i < response.length; i++) {
    //                    var modinfo = {
    //                        Module: 'Learn Plan',
    //                        Date: response[i].PlanDate,
    //                        Detail: "User: " + response[i].UserID + "; Name: " + response[i].ObjectName
    //                    };
    //                    $scope.listModInfo.push(modinfo);
    //                }
    //            }, function (reason) {
    //                // To-Do
    //            });
            };
            $scope.refreshTodo();
            
            // User detail page
            $scope.listCurUserLogList = [];
            
            //$scope.displayedCollection = [
            //    { userobj: 'Common.ID', usercont: $scope.CurrentUser.userid },
            //    { userobj: 'Login.DisplayAs', usercont: $scope.CurrentUser.userdisplayas },
            //    { userobj: 'Login.Gender', usercont: utils.genderFormatter($scope.CurrentUser.usergender) },
            //    { userobj: 'Login.RegisterDate', usercont: $scope.CurrentUser.usercreatedon }
            //];
            
            $scope.logout = function () {
                //$log.info("HIH: Logout triggerd!");
                //utils.sendRequest({ objecttype: 'USERLOGOUT' }, function (data, status, headers, config) {
                    
                //    // Clear the current user information
                //    $rootScope.isLogin = false;
                //    $rootScope.CurrentUser = {};
                //    $scope.CurrentUser = {};
                    
                //    for (var prop in $rootScope) {
                //        if ($rootScope.hasOwnProperty(prop)) {
                //            $log.log("HIH Logout: " + prop);
                //            if (prop.charAt(0) !== "$") {
                //                delete $rootScope[prop];
                //                $log.log("HIH Logout: " + prop + " removed");
                //            }
                //        }
                //    }
                    
                //    // Redirect to login page
                //    $state.go('login');
                //}, function (data, status, headers, config) {
                //    // Throw out error message				
                //    $rootScope.$broadcast('ShowMessageEx', 'Error', [{ Type: 'danger', Message: 'Unknown reason for logging out!' }]);
                //});
            };
            
            $scope.setTheme = function (theme) {
                //$log.info("HIH: Theme change triggerd!");
                
                //var realtheme = "";
                //if (theme && theme.length > 0) {
                //    // Now replace the CSS
                //    realtheme = theme;
                //} else {
                //    // Go for default theme
                //    realtheme = "default";
                //}
                //$rootScope.$broadcast('ThemeChange', realtheme);
            };
            
            $scope.setLanguage = function (newLang) {
                //$log.info("HIH: Language change triggerd!");
                //$translate.use(newLang);
            };
        }])

	.controller('UserListController', ['$scope', '$rootScope', '$state', '$http', '$log', function ($scope, $rootScope, $state, $http, $log) {
        }])
	
	.controller('AboutController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        }])
    ;
})();

