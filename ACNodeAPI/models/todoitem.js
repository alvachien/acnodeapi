var TodoItem = function () {
    this.ID = -1;
    this.Name = "";
    this.Details = "";
    this.ParentID = -1;
    this.DependItems = [];

    this.initFromDBModel = function (dbmodel) {
        this.ID = dbmodel.ID;
        this.Name = dbmodel.Name;
        this.Details = dbmodel.Details;
        this.ParentID = dbmodel.ParentID;
        // Depend...
    }
    this.saveToDBModel = function (dbmodel) {

    }
}

module.exports = TodoItem;
