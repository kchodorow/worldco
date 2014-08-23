goog.provide('worldco.Terminal');

goog.require('lime.Label');
goog.require('lime.Scene');
goog.require('lime.Sprite');

goog.require('lib.Keyboard');
goog.require('worldco.Player');
goog.require('worldco.Stuff');
goog.require('worldco.TrashCan');

worldco.Terminal = function(airport) {
    goog.base(this);

    this.paused_ = false;
    this.appendChild(new lime.Label().setSize(WIDTH, 50).setFontSize(30)
            .setText("Welcome to "+airport.name()).setPosition(WIDTH/2, 100));

    this.TERMINAL_WIDTH = 1000;
    this.TERMINAL_TOP = HEIGHT/2 - 100;
    this.TERMINAL_MIDDLE = HEIGHT/2;
    this.airport_ = airport;
    this.appendChild(new lime.Sprite().setSize(1000, 200).setFill('#ddd')
                     .setPosition(WIDTH/2, HEIGHT/2).setStroke(1, '#000'));
    this.makeGates_();
    this.addStuff_();
    this.addPlayer_();
    this.addState_();

    lime.scheduleManager.schedule(this.tick_, this);
};

goog.inherits(worldco.Terminal, lime.Scene);

worldco.Terminal.prototype.makeGates_ = function() {
    var outgoing = this.airport_.getOutgoing();
    var distance_between_gates = (this.TERMINAL_WIDTH - 2*LEN)/outgoing.length;
    for (var i in outgoing) {
        var dest = outgoing[i];
        var gate = new worldco.Gate(dest);
        gate.setPosition(LEN + distance_between_gates * i, this.TERMINAL_TOP);
        this.appendChild(gate);
        goog.events.listen(gate, ['mousedown'], function(e) {
            worldco.director.replaceScene(new worldco.Terminal(dest));
        });
    }
};

worldco.Terminal.prototype.addStuff_ = function() {
    this.stuff_ = new Array(Math.floor(this.TERMINAL_WIDTH/LEN));
    for (var i = 0; i < this.stuff_.length; ++i) {
        this.stuff_[i] = worldco.Stuff.NOTHING;
    }

    this.stuff_[10] = new worldco.TrashCan();
    this.appendChild(this.stuff_[10].setPosition(10*LEN, 300));
};

worldco.Terminal.prototype.addPlayer_ = function() {
    this.player_ = new worldco.Player();
    this.appendChild(this.player_);
    var keyboard = new lib.Keyboard(this);
    keyboard.bindWasd(goog.bind(this.player_.setIntention, this.player_));
};

worldco.Terminal.prototype.addState_ = function() {
    var wallet = new lime.Label().setSize(100, 50).setFontSize(20)
            .setText('$' + worldco.game_state.getMoney())
            .setPosition(WIDTH - 100, 50);
    this.appendChild(wallet);
};

worldco.Terminal.prototype.tick_ = function(delta) {
    if (this.paused_) {
        return;
    }

    if (this.player_.isInteracting()) {
        var pos = Math.floor(this.player_.getPosition().x / LEN);
        var found = this.stuff_[pos].interact();
        for (var i = 0; i < found.length; ++i) {
            this.appendChild(found[i].setPosition(500, 500));
            worldco.game_state.addToInventory(found[i]);
        }
    }
    this.player_.move(delta);
};

worldco.Gate = function(destination) {
    goog.base(this);

    this.destination_ = destination;

    this.setSize(LEN, LEN).setFill('#ccc');
    var lbl = new lime.Label().setSize(LEN*2, 50).setFontSize(30)
            .setText(destination.name()).setPosition(0, 0);
    this.appendChild(lbl);
};

goog.inherits(worldco.Gate, lime.Sprite);
