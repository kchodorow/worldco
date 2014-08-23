goog.provide('worldco.Ticket');

goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Spawn');

worldco.Ticket = function() {
    goog.base(this);

    this.price_ = goog.math.randomInt(worldco.Ticket.PRICE_DIFF) +
        worldco.Ticket.MIN_PRICE;
    this.appendChild(worldco.resources.getTicket().setScale(2, 2));
    this.runAction(new lime.animation.Spawn(
        new lime.animation.MoveTo(WIDTH - 100, 100),
        new lime.animation.FadeTo(0),
        new lime.animation.ScaleTo(1, 1)));
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
