goog.provide('worldco.State');

goog.require('goog.array');

goog.require('worldco.Ticket');
goog.require('worldco.AirportMap');

worldco.State = function() {
    var boston = new worldco.Ticket();
    boston.setDestination(worldco.map.getDestination());
    this.inventory_ = {};
    this.inventory_[boston.name()] = boston;
    this.money_ = 1000;
    this.clues_ = [];
    this.smelliness_ = 0;
};

worldco.State.prototype.increaseSmelliness = function() {
    this.smelliness_++;
};

worldco.State.prototype.wash = function() {
    this.smelliness_ = Math.max(0, this.smelliness_ - 5);
};

worldco.State.prototype.getSmelliness = function() {
    return this.smelliness_;
};

worldco.State.prototype.getMoney = function() {
    return this.money_;
};

worldco.State.prototype.spend = function(amount) {
    this.money_ -= amount;
};

worldco.State.prototype.hasItem = function(name) {
    return name in this.inventory_;
};

worldco.State.prototype.addToInventory = function(thing) {
    this.money_ -= thing.getPrice();
    this.inventory_[thing.name()] = thing;
};

worldco.State.prototype.removeFromInventory = function(name) {
    delete this.inventory_[name];
};

worldco.State.prototype.getInventorySprite = function() {
    var keys = Object.keys(this.inventory_);
    // TODO: show boarding pass next to ticket.
    return worldco.resources.getDialog("Inventory:\n"+keys.join("\n"));
};

worldco.State.prototype.addClue = function(clue) {
    if (goog.array.indexOf(this.clues_, clue) != -1) {
        return;
    }
    this.clues_.push(clue);
};

worldco.State.prototype.getLogSprite = function() {
    var dialog = worldco.resources.getDialog(
        "Known facts:\n" + this.clues_.join("\n"));
    dialog.label_.setAlign('left');
    return dialog;
};
