goog.provide('worldco.Ticket');

goog.require('lime.Sprite');

worldco.Ticket = function() {
    goog.base(this);

    this.price_ = goog.math.randomInt(worldco.Ticket.PRICE_DIFF) +
        worldco.Ticket.MIN_PRICE;
    this.setStroke(1, '#000').setSize(LEN, LEN/2);
};

goog.inherits(worldco.Ticket, lime.Sprite);

worldco.Ticket.MIN_PRICE = 400;
worldco.Ticket.PRICE_DIFF = 200;

worldco.Ticket.getRandom = function() {
    var ticket = new worldco.Ticket();
    ticket.setDestination(worldco.map.getRandom());
    ticket.price_ = 0;
    return ticket;
};

worldco.Ticket.getName = function(dest) {
    return "Ticket to " + dest.name();
};

worldco.Ticket.prototype.setDestination = function(dest) {
    this.to_ = dest;
};

worldco.Ticket.prototype.getDestination = function() {
    return this.to_.name();
};

worldco.Ticket.prototype.getPrice = function() {
    return this.price_;
};

worldco.Ticket.prototype.name = function() {
    return worldco.Ticket.getName(this.to_);
};
