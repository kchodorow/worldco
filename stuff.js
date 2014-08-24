goog.provide('worldco.Stuff');
goog.provide('worldco.TrashCan');

goog.require('worldco.Ticket');

worldco.Stuff = function() {
    goog.base(this);

    this.inventory_ = [];
};

goog.inherits(worldco.Stuff, lime.Sprite);

worldco.Stuff.prototype.interact = function() {
    return [];
};

worldco.Stuff.NOTHING = new worldco.Stuff();

worldco.TrashCan = function() {
    goog.base(this);

    this.appendChild(worldco.resources.getTrashCan());
    this.empty_ = false;
};

goog.inherits(worldco.TrashCan, worldco.Stuff);

worldco.TrashCan.prototype.interact = function() {
    worldco.game_state.increaseSmelliness();
    if (this.empty_) {
        var label = worldco.resources.getDialog(
            "You found some trash.");
        this.getScene().appendChild(label);
        return [];
    } else if (goog.math.randomInt(2) == 0) {
        this.empty_ = true;
    }

    var ticket = worldco.Ticket.getRandom();
    var label = worldco.resources.getDialog(
        "You found a ticket to " + ticket.getDestination()
            + " in the trash.");
    this.getScene().appendChild(label);
    return [ticket];
};
