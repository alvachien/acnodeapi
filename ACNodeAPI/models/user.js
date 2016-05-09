var crypto = require('crypto');

var apiuser = function () {
    this.UserID = "";
    this.DisplayAs = "";
    this.HashedPassword = "";
    this.Mailbox = "";
    this.Gender = false;
    this.RegisterDate = new Date();
    
    this.initForRegister = function (uibody) {
        this.UserID = uibody.UserID;
        this.DisplayAs = uibody.DisplayAs;
        this.Password = uibody.Password;
        this.ConfirmedPassword = uibody.ConfirmedPassword;
        this.Mailbox = uibody.Mailbox;
        this.Gender = uibody.Gender;
    };
    
    this.initForLogin = function (username, password) {
        this.UserID = username;
        this.Password = password;
    };
    
    this.initFromDBModel = function (dbmodel) {
        this.UserID = dbmodel.Name;
        this.DisplayAs = dbmodel.DisplayAs;
        this.RegisterDate = dbmodel.RegisterDate;
        this.Mailbox = dbmodel.Mailbox;
        this.Gender = dbmodel.Gender;
    };
    
    this.prepareForRegister = function () {
        var arResult = [];
        arResult.push(this.UserID);
        arResult.push(this.DisplayAs);
        var shasum = crypto.createHmac('sha1', this.UserID);
        shasum.update(this.Password);
        var encrypted = shasum.digest('hex');        
        arResult.push(encrypted);
        arResult.push(this.UserID);
        arResult.push(this.Mailbox);
        arResult.push(this.Gender);

        return arResult;
    };
    
    this.checkForRegister = function () {
        var arErr = [];
        
        if (!this.UserID || this.UserID.length <= 0) {
            arErr.push("User ID is a must!");
        }
        if (!this.Password || this.Password.length <= 0) {
            arErr.push("Password is a must!");
        }
        if (!this.ConfirmedPassword || this.ConfirmedPassword.length <= 0) {
            arErr.push("Confirmed password is a must!");
        }
        if (this.Password !== this.ConfirmedPassword) {
            arErr.push("Password is not equal with Confirmed password");
        }
        if (!this.Mailbox || this.Mailbox.length <= 0) {
            arErr.push("Mailbox is a must!");
        }
        
        return arErr;
    };

    this.checkForLogin = function () {
        var arErr = [];
        
        if (!this.UserID || this.UserID.length <= 0) {
            arErr.push("User ID is a must!");
        }
        if (!this.Password || this.Password.length <= 0) {
            arErr.push("Password is a must!");
        }
        return arErr;
    };
}

module.exports = apiuser;