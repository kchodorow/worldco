goog.provide('worldco.Bathroom');

goog.require('worldco.Stuff');

worldco.Bathroom = function() {
    goog.base(this);
    var door = new lime.RoundedRect().setSize(LEN, LEN*2)
            .setFill(worldco.resources.DARK_BLUE)
            .setPosition(0, -10);
    door.appendChild(worldco.resources.getLadiesRoom());
    this.appendChild(door);
};

goog.inherits(worldco.Bathroom, worldco.Stuff);

worldco.Bathroom.prototype.interact = function() {
    worldco.game_state.wash();
    return [];
};
