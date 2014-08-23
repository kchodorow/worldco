goog.provide('worldco.State');

worldco.State = function() {
    this.inventory_ = [];
    this.money_ = 1000;
};

worldco.State.prototype.getMoney = function() {
    return this.money_;
};

worldco.State.prototype.spend = function(amount) {
    this.money_ -= amount;
};
