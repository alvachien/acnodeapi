var apiuser = function () {
    this.Name = "";
    this.DisplayAs = "";
    this.HashedPassword = "";
    this.RegisterDate = new Date();

    this.initFromDBModel = function (dbmodel) {
        this.Name = dbmodel.Name;
        this.DisplayAs = dbmodel.DisplayAs;
        this.RegisterDate = dbmodel.RegisterDate;
    }
}

module.exports = apiuser;