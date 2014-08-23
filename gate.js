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
        var dialog = worldco.resources.getYesNoDialog(
            "Would you like to use your ticket to " + this.destination_.name()
                + "?");
        this.getScene().appendChild(dialog);
        goog.events.listen(dialog.no_, ['mousedown'], function(e) {
            dialog.getParent().removeChild(dialog);
        });

        // For the closure.
        var destination = this.destination_;
        goog.events.listen(dialog.yes_, ['mousedown'], function(e) {
            worldco.game_state.removeFromInventory(this.ticket_needed_);
            worldco.director.replaceScene(
                new worldco.Terminal(destination));
        });
    } else {
        var dialog = worldco.resources.getYesNoDialog(
            "Would you like to buy a ticket to " +
                this.destination_.name() + " for $" +
                this.ticket_for_sale_.getPrice() + "?");
        var scene = this.getScene();
        scene.appendChild(dialog);
        goog.events.listen(dialog.no_, ['mousedown'], function(e) {
            dialog.getParent().removeChild(dialog);
        });
        var ticket = this.ticket_for_sale_;
        goog.events.listen(dialog.yes_, ['mousedown'], function(e) {
            dialog.getParent().removeChild(dialog);
            if (worldco.game_state.getMoney() < ticket.getPrice()) {
                scene.appendChild(
                    worldco.resources.getDialog("Not enough money!"));
            } else {
                worldco.game_state.addToInventory(ticket);
            }
        });
    }
    return [];
};
