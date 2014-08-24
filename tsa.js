goog.provide('worldco.Tsa');

goog.require('worldco.Stuff');

worldco.Tsa = function() {
    goog.base(this);

    this.appendChild(worldco.resources.getTsa());
};

goog.inherits(worldco.Tsa, worldco.Stuff);

worldco.Tsa.prototype.interact = function() {
    var NUM_OPTIONS = 7;
    switch (goog.math.randomInt(NUM_OPTIONS)) {
    case 0:
        var dialog = worldco.resources.getDialog(
            "\"Zug zug.\"");
        this.getScene().appendChild(dialog);
        break;
    case 1:
        var dialog = worldco.resources.getDialog(
            "\"What do you want?\"");
        this.getScene().appendChild(dialog);
        break;
    case 2:
        var dialog = worldco.resources.getDialog(
            "\"If you see something, say something.\"");
        this.getScene().appendChild(dialog);
        break;
    case 3:
        var dialog = worldco.resources.getDialog(
            "\"Work, work.\"");
        this.getScene().appendChild(dialog);

        break;
    case 4:
        var dialog = worldco.resources.getDialog("\"No, you can't leave.\"");
        this.getScene().appendChild(dialog);
        break;
    case 5:
        var dialog = worldco.resources.getDialog(
            "\"Does the security checkpoint mean nothing to you?\"");
        this.getScene().appendChild(dialog);
        break;
    case 6:
        var dialog = worldco.resources.getDialog(
            "\"I don't get trapped forever at your place of work.\"");
        this.getScene().appendChild(dialog);
        break;
    }
    return [];
};
