goog.provide('worldco.Ticket');

goog.require('lime.Sprite');

worldco.Ticket = function() {
    goog.base(this);

    this.to_ = worldco.map.getRandom();
    this.setStroke(1, '#000').setSize(LEN, LEN/2);
};

goog.inherits(worldco.Ticket, lime.Sprite);

worldco.Ticket.prototype.getDestination = function() {
    return this.to_.name();
};
