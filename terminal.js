goog.provide('worldco.Terminal');

goog.require('lime.Label');
goog.require('lime.Scene');
goog.require('lime.Sprite');

worldco.Terminal = function(airport) {
    goog.base(this);

    this.TERMINAL_WIDTH = 1000;
    this.TERMINAL_TOP = HEIGHT/2 - 100;
    this.TERMINAL_MIDDLE = HEIGHT/2;
    this.airport_ = airport;
    this.appendChild(new lime.Sprite().setSize(1000, 200).setFill('#ddd')
                     .setPosition(WIDTH/2, HEIGHT/2).setStroke(1, '#000'));
    this.makeGates_();

};

goog.inherits(worldco.Terminal, lime.Scene);

worldco.Terminal.prototype.makeGates_ = function() {
    var outgoing = this.airport_.getOutgoing();
    var distance_between_gates = (this.TERMINAL_WIDTH - 2*LEN)/outgoing.length;
    for (var i in outgoing) {
        var gate = new lime.Sprite().setSize(LEN, LEN)
                .setPosition(LEN + distance_between_gates * i, this.TERMINAL_TOP)
                .setFill('#ccc');
        var lbl = new lime.Label().setSize(LEN*2, 50).setFontSize(30)
                .setText(outgoing[i].name()).setPosition(0, 0);
        gate.appendChild(lbl);
        this.appendChild(gate);
    }
};


worldco.Gate = function(destination) {
    this.destination_ = destination;
};
