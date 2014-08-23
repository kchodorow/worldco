goog.provide('worldco.data.Resources');

goog.require('lime.parser.JSON');
goog.require('lime.ASSETS.worldco.json');
goog.require('lime.SpriteSheet');

worldco.data.Resources = function() {
    this.FONT_SIZE = 30;
    this.LINE_HEIGHT = LEN;
    this.FONT_FAMILY = 'VT323';

    this.YELLOW = '#F4F7D9';
    this.TAN = '#6C6E58';
    this.BROWN = '#3E423A';
    this.LIGHT_BLUE = '#A4CFBE';
    this.DARK_BLUE = '#417378';

    this.spriteSheet_ = new lime.SpriteSheet('assets/worldco.png',
                                             lime.ASSETS.worldco.json,
                                             lime.parser.JSON);
};

worldco.data.Resources.prototype.getPlayer = function() {
    return new lime.Sprite().setFill(this.spriteSheet_.getFrame('walk1.png'));
};

worldco.data.Resources.prototype.getTrashCan = function() {
    return new lime.Sprite().setFill(this.spriteSheet_.getFrame('trash.png'));
};

worldco.data.Resources.prototype.getLabel = function(text) {
    return new lime.Label().setText(text)
        .setFontSize(this.FONT_SIZE)
        .setFontColor(this.DARK_BLUE)
        .setFontFamily(this.FONT_FAMILY)
        .setMultiline(true);
};

worldco.data.Resources.prototype.getDialog_ = function(text) {
    var num_lines = text.split('\n').length + 2;
    var height = this.LINE_HEIGHT * num_lines;
    var background = new lime.Sprite().setSize(710, height+10)
            .setFill(this.YELLOW).setPosition(WIDTH/2, 100)
            .setStroke(3, this.TAN);
    var label = this.getLabel(text).setPosition(0, height/-2 + LEN);
    background.appendChild(label);
    return background;
};

worldco.data.Resources.prototype.getDialog = function(text) {
    var dialog = this.getDialog_(text);
    var height = dialog.getSize().height;
    var ok_button = new lime.Sprite().setSize(100, 50)
            .setPosition(0, height/2 - LEN).setStroke(3, this.TAN);
    ok_button.appendChild(this.getLabel("Okay"));
    dialog.appendChild(ok_button);
    goog.events.listen(ok_button, ['mousedown'], function(e) {
        dialog.getParent().removeChild(dialog);
    });
    return dialog;
};

worldco.data.Resources.prototype.getYesNoDialog = function(text) {
    var dialog = this.getDialog_(text);
    var height = dialog.getSize().height;

    var no_button = new lime.Sprite().setSize(100, 50)
            .setPosition(-75, height/2 - LEN).setStroke(3, this.TAN);
    no_button.appendChild(this.getLabel("No"));
    dialog.appendChild(no_button);

    var yes_button = new lime.Sprite().setSize(100, 50)
            .setPosition(75, height/2 - LEN).setStroke(3, this.TAN);
    yes_button.appendChild(this.getLabel("Yes"));
    dialog.appendChild(yes_button);

    dialog.no_ = no_button;
    dialog.yes_ = yes_button;
    return dialog;
};
