(function () {
    "use strict";

    var acnodeapi = window.acnodeapi || (window.acnodeapi = {});
    
    // Extends
    acnodeapi.extends = (acnodeapi && acnodeapi.extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    
    // Utility lcass - singleton object
    acnodeapi.Utility = {};
    acnodeapi.Utility.LoginPasswordLength = {
        VeryWeek: 0,
        Week: 1,
        Normal: 2,
        Strong: 3,
        VeryStrong: 4
    };
        
    acnodeapi.Utility.DateFormatter = function (dateinf) {
        if ("object" === typeof dateinf) {
            var y = dateinf.getFullYear();
            var m = dateinf.getMonth() + 1;
            var d = dateinf.getDate();
            return y.toString() + hih.Constants.DateSplitChar + (m < 10 ? ('0' + m) : m).toString() + hih.Constants.DateSplitChar + (d < 10 ? ('0' + d) : d).toString();
        }
        
        return dateinf;
    };
    acnodeapi.Utility.DatabaseDateFormatter = function (dateinf) {
        if ("object" === typeof dateinf) {
            var y = dateinf.getFullYear();
            var m = dateinf.getMonth() + 1;
            var d = dateinf.getDate();
            return y.toString() + (m < 10 ? ('0' + m) : m).toString() + (d < 10 ? ('0' + d) : d).toString();
        }
        
        return dateinf;
    };
    acnodeapi.Utility.DateParser = function (s) {
        if (!s)
            return new Date();
        var ss = (s.split(hih.Constants.DateSplitChar));
        var y = parseInt(ss[0], 10);
        var m = parseInt(ss[1], 10);
        var d = parseInt(ss[2], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            return new Date(y, m - 1, d);
        } else {
            return new Date();
        }
    };
    acnodeapi.Utility.DaysBetween = function (first, second) {
        // Copy date parts of the timestamps, discarding the time parts.
        var one = new Date(first.getYear(), first.getMonth(), first.getDate());
        var two = new Date(second.getYear(), second.getMonth(), second.getDate());
        
        // Do the math.
        var millisecondsPerDay = 1000 * 60 * 60 * 24;
        var millisBetween = two.getTime() - one.getTime();
        var days = millisBetween / millisecondsPerDay;
        
        // Round down.
        return Math.floor(days);
    };
    acnodeapi.Utility.Round2Two = function (num) {
        //return +(Math.round(num + "e+2")  + "e-2");
        return Math.round(num * 100) / 100;
    };
    acnodeapi.Utility.CheckMail = function (strMail) {
        var isValid = false;
        
        if (strMail.indexOf('@') >= 1) {
            var m_valid_dom = strMail.substr(strMail.indexOf('@') + 1);
            if (m_valid_dom.indexOf('@') === -1) {
                if (m_valid_dom.indexOf('.') >= 1) {
                    var m_valid_dom_e = m_valid_dom.substr(m_valid_dom.indexOf('.') + 1);
                    if (m_valid_dom_e.length >= 1) {
                        isValid = true;
                    }
                }
            }
        }
        
        return isValid;
    };
    acnodeapi.Utility.CheckStringLength = function (strField, minlength, maxLength) {
        var length_df = strField.length;
        var bResult = false;
        
        if (length_df >= minlength && length_df <= maxLength) {
            bResult = true;
        }
        
        return bResult;
    };
    acnodeapi.Utility.CheckPasswordStrength = function (strField) {
        var pass_level = 0;
        
        if (strField.match(/[a-z]/g)) {
            pass_level++;
        }
        if (strField.match(/[A-Z]/g)) {
            pass_level++;
        }
        if (strField.match(/[0-9]/g)) {
            pass_level++;
        }
        if (strField.length < 5) {
            if (pass_level >= 1) pass_level--;
        } else if (strField.length >= 20) {
            pass_level++;
        }
        
        return pass_level;
    };
    acnodeapi.Utility.hasDuplicatesInStringArray = function (strarray) {
        var valuesSoFar = Object.create(null);
        for (var i = 0; i < strarray.length; ++i) {
            var value = strarray[i];
            if (value in valuesSoFar) {
                return true;
            }
            valuesSoFar[value] = true;
        }
        return false;
    };

    // User Basic Info
    acnodeapi.UserBasicInfo = (function () {
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
    
    // User Register info
    acnodeapi.UserRegisterInfo = (function (_super) {
        acnodeapi.extends(UserRegisterInfo, _super);

        function UserRegisterInfo() {
            _super.apply(this, arguments);
            
            // New fields
            this.ConfirmedPassword = "";
            this.DisplayAs = "";
            this.Mailbox = "";
            this.Gender = 0;
            this.PasswordStrengthValue = "";
        }
        
        UserRegisterInfo.prototype.IsValid = function () {
            if (this.UserID.length <= 0)
                return false;
            if (this.Password.length <= 0)
                return false;
            if (this.Password !== this.ConfirmedPassword)
                return false;
            return true;
        };
        return UserRegisterInfo;
    }(acnodeapi.UserBasicInfo));
}());