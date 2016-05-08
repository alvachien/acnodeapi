var apiuser = function () {
    this.Name = "";
    this.DisplayAs = "";
    this.HashedPassword = "";
    this.Mailbox = "";
    this.RegisterDate = new Date();
    
    this.initForRegister = function (uibody) {
        this.Name = uibody.Name;
        this.Password = uibody.Password;
        this.ConfirmedPassword = uibody.ConfirmedPassword;
        this.Mailbox = uibody.Mailbox;
    };
    
    this.checkForRegister = function () {
        var arErr = [];
        
        if (!this.Name || this.Name.length <= 0) {
            arErr.push("Name is a must!");
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

        return arErr;
    };

    this.initFromDBModel = function (dbmodel) {
        this.Name = dbmodel.Name;
        this.DisplayAs = dbmodel.DisplayAs;
        this.RegisterDate = dbmodel.RegisterDate;
    }
}

module.exports = apiuser;