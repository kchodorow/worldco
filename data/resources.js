goog.provide('worldco.data.Resources');

worldco.data.Resources = function() {
    this.FONT_SIZE = 30;
    this.LINE_HEIGHT = LEN;
};

worldco.data.Resources.prototype.getDialog_ = function(text) {
    var num_lines = text.split('\n').length + 2;
    var height = this.LINE_HEIGHT * num_lines;
    var background = new lime.Sprite().setSize(710, height+10)
            .setFill('#ACEBAE').setPosition(WIDTH/2, 100);
    background.appendChild(
        new lime.Sprite().setSize(700, height).setFill('#7D9100')
            .setStroke(3, '#324242'));

    var label = new lime.Label().setText(text)
        .setFontSize(this.FONT_SIZE)
        .setFontColor('#FFFF9D')
        .setMultiline(true)
        .setPosition(0, height/-2 + LEN);
    background.appendChild(label);
    return background;
};

worldco.data.Resources.prototype.getDialog = function(text) {
    var dialog = this.getDialog_(text);
    var height = dialog.getSize().height;
    var ok_button = new lime.Sprite().setSize(100, 50)
            .setPosition(0, height/2 - LEN);
    ok_button.appendChild(new lime.Label().setText("Okay")
        .setFontSize(this.FONT_SIZE)
        .setFontColor('#FFFF9D'));
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
            .setPosition(-75, height/2 - LEN);
    no_button.appendChild(new lime.Label().setText("No")
        .setFontSize(this.FONT_SIZE)
        .setFontColor('#FFFF9D'));
    dialog.appendChild(no_button);

    var yes_button = new lime.Sprite().setSize(100, 50)
            .setPosition(75, height/2 - LEN);
    yes_button.appendChild(new lime.Label().setText("Yes")
        .setFontSize(this.FONT_SIZE)
        .setFontColor('#FFFF9D'));
    dialog.appendChild(yes_button);

    dialog.no_ = no_button;
    dialog.yes_ = yes_button;
    return dialog;
};
