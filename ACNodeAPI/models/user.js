var apiuser = function () {
    this.Name = "";
    this.Password = "";
    this.DisplayAs = "";
    //this.HashedPassword = "";
    this.Mailbox = "";
    this.RegisterDate = new Date();
    
    this.initFromUIBody = function (uibody) {
        this.Name = uibody.Name;
        this.Password = uibody.Password;
        this.ConfirmedPassword = uibody.ConfirmedPassword;
        this.Mailbox = uibody.Mailbox;
    };
    
    this.checkForRegister = function () {
        var arErr = [];
        return arErr;
    };

    this.initFromDBModel = function (dbmodel) {
        this.Name = dbmodel.Name;
        this.DisplayAs = dbmodel.DisplayAs;
        this.RegisterDate = dbmodel.RegisterDate;
    }
}

module.exports = apiuser;