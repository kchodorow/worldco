goog.provide('worldco.Stuff');
goog.provide('worldco.TrashCan');

goog.require('worldco.Ticket');

worldco.Stuff = function() {
    goog.base(this);

    this.setFill('#00f').setSize(LEN, LEN);

    this.inventory_ = [];
};

goog.inherits(worldco.Stuff, lime.Sprite);

worldco.Stuff.prototype.interact = function() {
    return [];
};

worldco.Stuff.NOTHING = new worldco.Stuff();

worldco.TrashCan = function() {
    goog.base(this);

    this.empty_ = false;
};

goog.inherits(worldco.TrashCan, worldco.Stuff);

worldco.TrashCan.prototype.interact = function() {
    if (!this.empty_) {
        if (goog.math.randomInt(2) == 0) {
            this.empty_ = true;
        }
    }
    var ticket = worldco.Ticket.getRandom();
    var label = new lime.Label().setSize(100, 50).setFontSize(20)
            .setText("You found a ticket to " + ticket.getDestination()
                     + " in the trash")
            .setPosition(0, -100);
    this.appendChild(label);
    return [ticket];
};