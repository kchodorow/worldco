goog.provide('worldco.ClueMook');

goog.require('worldco.Stuff');

/**
 * Each mook is a state machine.  Information is a 1-state.
 * Fetch quest is 2-state:
 * 1. "I'll give you a ticket/money for ticket/item".
 * 2. Give mook thing?
 *    yes - get item.
 *    no - nothing happens.
 */
worldco.ClueMook = function(clue) {
    goog.base(this);

    this.dest_ = clue.to;
    this.source_ = clue.from;
    this.setFill('#000').setSize(LEN, LEN);
};

goog.inherits(worldco.ClueMook, worldco.Stuff);

worldco.ClueMook.prototype.interact = function() {
    this.getScene().appendChild(
        worldco.resources.getDialog(
            "\"I hear there are flights from " + this.source_ + " to "
                + this.dest_ + ".\""));

    return [];
};