goog.provide('worldco.State');

goog.require('worldco.Ticket');
goog.require('worldco.AirportMap');

worldco.State = function() {
    var boston = new worldco.Ticket();
    boston.setDestination(worldco.map.getDestination());
    this.inventory_ = {};
    this.inventory_[boston.name()] = boston;
    this.money_ = 1000;
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
    return worldco.resources.getDialog(keys.join("\n"));
};
