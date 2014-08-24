goog.provide('worldco.Gate');

goog.require('lime.RoundedRect');
goog.require('worldco.OutroScene');
goog.require('worldco.Stuff');

worldco.Gate = function(destination) {
    goog.base(this);

    this.destination_ = destination;

    this.appendChild(new lime.RoundedRect().setSize(LEN * 1.5, LEN * 2)
                     .setFill(worldco.resources.BROWN)
                     .setPosition(0, -10));
    var lbl = worldco.resources.getLabel(destination.name())
            .setSize(150, 50).setFontSize(30).setPosition(0, -LEN*2);
    this.appendChild(lbl);

    this.appendChild(worldco.resources.getAgent().setScale(2,2));

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
        var ticket = this.ticket_needed_;
        goog.events.listen(dialog.yes_, ['mousedown'], function(e) {
            worldco.game_state.removeFromInventory(ticket);
            if (destination.name() == worldco.map.getDestination().name()) {
                worldco.director.replaceScene(new worldco.OutroScene());
            } else {
                worldco.director.replaceScene(
                    new worldco.Terminal(destination));
            }
        });
    } else {
        var dialog = worldco.resources.getYesNoDialog(
            "Would you like to fly to " +
                this.destination_.name() + " for $" +
                this.ticket_for_sale_.getPrice() + "?");
        var scene = this.getScene();
        scene.appendChild(dialog);
        goog.events.listen(dialog.no_, ['mousedown'], function(e) {
            dialog.getParent().removeChild(dialog);
        });
        var ticket = this.ticket_for_sale_;
        var destination = this.destination_;
        goog.events.listen(dialog.yes_, ['mousedown'], function(e) {
            dialog.getParent().removeChild(dialog);
            if (worldco.game_state.getMoney() < ticket.getPrice()) {
                scene.appendChild(
                    worldco.resources.getDialog("Not enough money!"));
            } else {
                if (destination.name() == worldco.map.getDestination().name()) {
                    worldco.director.replaceScene(new worldco.OutroScene());
                } else {
                    worldco.director.replaceScene(
                        new worldco.Terminal(destination));
                }
            }
        });
    }
    return [];
};
