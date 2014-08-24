goog.provide('worldco.HelpDesk');

goog.require('worldco.Stuff');

worldco.HelpDesk = function() {
    goog.base(this);

    this.appendChild(worldco.resources.getAgent()
                     .setPosition(0, -5));
    var desk = new lime.Sprite().setSize(LEN * 2, LEN)
            .setFill(worldco.resources.TAN).setPosition(0, LEN/2);
    var label = worldco.resources.getLabel("HELP").setFontSize(20)
            .setFontColor(worldco.resources.YELLOW);
    desk.appendChild(label);
    this.appendChild(desk);
};

goog.inherits(worldco.HelpDesk, worldco.Stuff);

worldco.HelpDesk.prototype.interact = function() {
    var NUM_OPTIONS = 7;
    switch (goog.math.randomInt(NUM_OPTIONS)) {
    case 0:
        var dialog = worldco.resources.getDialog(
            "I am busy assisting other customers at this time.\nPlease try"
                +" again later.");
        this.getScene().appendChild(dialog);
        break;
    case 1:
        var dialog = worldco.resources.getDialog(
            "Your business is important to us.");
        this.getScene().appendChild(dialog);
        break;
    case 2:
        var dialog = worldco.resources.getDialog(
            "I'll give you $50 for you to leave.");
        this.getScene().appendChild(dialog);
        worldco.game_state.spend(-50);
        break;
    case 3:
        var dialog = worldco.resources.getDialog(
            "I recommend finding a flight to Boston.");
        this.getScene().appendChild(dialog);

        break;
    case 4:
        var dialog = worldco.resources.getDialog(
            "Here's a free ticket for your trouble.");
        this.getScene().appendChild(dialog);
        worldco.game_state.addToInventory(worldco.Ticket.getRandom());
        break;
    case 5:
        var dialog = worldco.resources.getDialog(
            "Reply hazy, please try again.");
        this.getScene().appendChild(dialog);
        break;
    case 6:
        var dialog = worldco.resources.getDialog(
            "Go away kid, ya bother me.");
        this.getScene().appendChild(dialog);
        break;
    }
    return [];
};
