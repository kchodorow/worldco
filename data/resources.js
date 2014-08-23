goog.provide('worldco.data.Resources');

worldco.data.Resources = function() {
    this.FONT_SIZE = 30;
    this.LINE_HEIGHT = LEN;
};

worldco.data.Resources.prototype.getDialog = function(text) {
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

    var ok_button = new lime.Sprite().setSize(100, 50)
            .setPosition(0, height/2 - LEN);
    ok_button.appendChild(new lime.Label().setText("Okay")
        .setFontSize(this.FONT_SIZE)
        .setFontColor('#FFFF9D'));
    background.appendChild(ok_button);
    goog.events.listen(ok_button, ['mousedown'], function(e) {
        background.getParent().removeChild(background);
    });
    return background;
};
