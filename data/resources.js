goog.provide('worldco.data.Resources');

goog.require('lime.animation.KeyframeAnimation');
goog.require('lime.audio.Audio');
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

    try {
        // TODO: .ogg for Firefox!
        this.audio_ = new lime.audio.Audio('assets/muzak.mp3');
        this.audio_.play(true);
        this.mute_ = false;
    } catch (e) {
        console.log("Audio error: " + e);
    }
};

worldco.data.Resources.prototype.mute = function() {
    this.mute_ = !this.mute_;
    if (this.mute_) {
        this.audio_.stop();
    } else {
        this.audio_.play();
    }
};

worldco.data.Resources.prototype.getLogo = function() {
    return new lime.Sprite().setFill(this.spriteSheet_.getFrame('logo.png'));
};

worldco.data.Resources.prototype.getPlayer = function() {
    return new lime.Sprite().setFill(this.spriteSheet_.getFrame('walk1.png'));
};

worldco.data.Resources.prototype.getTrashCan = function() {
    return new lime.Sprite().setFill(this.spriteSheet_.getFrame('trash.png'));
};

worldco.data.Resources.prototype.getMook = function() {
    return new lime.Sprite().setFill(this.spriteSheet_.getFrame('suit.png'));
};

worldco.data.Resources.prototype.getAgent = function() {
    return new lime.Sprite().setFill(this.spriteSheet_.getFrame('agent.png'));
};

worldco.data.Resources.prototype.getTicket = function() {
    return new lime.Sprite().setFill(this.spriteSheet_.getFrame('pass.png'));
};

worldco.data.Resources.prototype.getLabel = function(text) {
    return new lime.Label().setText(text)
        .setFontSize(this.FONT_SIZE)
        .setFontColor(this.DARK_BLUE)
        .setFontFamily(this.FONT_FAMILY)
        .setMultiline(true);
};

worldco.data.Resources.prototype.getDialog_ = function(text) {
    var TOP = 100;
    var num_lines = text.split('\n').length + 2;
    var height = this.LINE_HEIGHT * num_lines;
    var background = new lime.Sprite().setSize(720, height+10)
            .setFill(this.YELLOW).setPosition(WIDTH/2, TOP)
            .setStroke(3, this.TAN).setAnchorPoint(.5, 0);
    var label = this.getLabel(text).setPosition(0, LEN/2)
            .setAnchorPoint(.5, 0)
            .setSize(700, height);
    background.appendChild(label);
    background.label_ = label;
    return background;
};

worldco.data.Resources.prototype.getDialog = function(text) {
    var dialog = this.getDialog_(text);
    var height = dialog.getSize().height;
    var ok_button = new lime.Sprite().setSize(100, 50)
            .setPosition(0, height - LEN).setStroke(3, this.TAN);
    ok_button.appendChild(this.getLabel("Okay"));
    dialog.appendChild(ok_button);
    var close = function(e) {
        if (dialog.getParent() == null) {
            return;
        }
        dialog.getParent().removeChild(dialog);
    };
    goog.events.listen(ok_button, ['mousedown'], close);
    worldco.keyboard.bind(goog.events.KeyCodes.ENTER, close);
    return dialog;
};

worldco.data.Resources.prototype.getYesNoDialog = function(text) {
    var dialog = this.getDialog_(text);
    var height = dialog.getSize().height;

    var no_button = new lime.Sprite().setSize(100, 50)
            .setPosition(-75, height - LEN).setStroke(3, this.TAN);
    no_button.appendChild(this.getLabel("No"));
    dialog.appendChild(no_button);

    var yes_button = new lime.Sprite().setSize(100, 50)
            .setPosition(75, height - LEN).setStroke(3, this.TAN);
    yes_button.appendChild(this.getLabel("Yes"));
    dialog.appendChild(yes_button);

    dialog.no_ = no_button;
    dialog.yes_ = yes_button;
    return dialog;
};
