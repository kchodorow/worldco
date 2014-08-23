goog.provide('worldco.Gate');

goog.require('worldco.Stuff');

worldco.Gate = function(destination) {
    goog.base(this);

    this.destination_ = destination;

    this.setSize(LEN, LEN).setFill('#ccc');
    var lbl = new lime.Label().setSize(LEN*2, 50).setFontSize(30)
            .setText(destination.name()).setPosition(0, 0);
    this.appendChild(lbl);

    this.ticket_for_sale_ = new worldco.Ticket();
    this.ticket_for_sale_.setDestination(this.destination_);
    this.ticket_needed_ = worldco.Ticket.getName(this.destination_);
};

goog.inherits(worldco.Gate, worldco.Stuff);

worldco.Gate.prototype.interact = function() {
    if (worldco.game_state.hasItem(this.ticket_needed_)) {
        worldco.game_state.removeFromInventory(this.ticket_needed_);
        worldco.director.replaceScene(new worldco.Terminal(this.destination_));
    } else {
        var agent = new lime.Label().setSize(LEN*2, 50).setFontSize(30)
            .setText("Would you like to buy a ticket to " +
                     this.destination_.name() + " for $" +
                     this.ticket_for_sale_.getPrice() + "?")
            .setPosition(0, 0);
        this.appendChild(agent);
    }
    return [];
};
