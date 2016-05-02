/* global $ */
/* global angular */
(function () {
    "use strict";
    
    var acToDo = window.acToDo || (window.acToDo = {});

    acToDo.__extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    // Basic User, normally used for login
    acToDo.UserBasicInfo = (function () {
        function UserBasicInfo() {
            this.UserID = "";
            this.Password = "";
        }
        //UserBasicInfo.prototype.start = function () {
        //    var _this = this;
        //    this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
        //};
        //UserBasicInfo.prototype.stop = function () {
        //    clearTimeout(this.timerToken);
        //};
        return UserBasicInfo;
    }());
    
    
    // User info for registeration purpose
    acToDo.UserRegisterInfo = (function (_super) {
        acToDo.__extends(UserRegisterInfo, _super);
        function UserRegisterInfo() {
            _super.apply(this, arguments);

            // New fields
            this.ConfirmedPassword = "";
            this.DisplayAs = "";
            this.Mailbox = "";
            this.Gender = 0;
            this.PasswordStrengthValue = "";
        }
        return UserRegisterInfo;
    }(acToDo.UserBasicInfo));
}());