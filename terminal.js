goog.provide('worldco.Terminal');

goog.require('lime.Label');
goog.require('lime.Scene');
goog.require('lime.Sprite');

goog.require('lib.Keyboard');
goog.require('worldco.ClueMook');
goog.require('worldco.Gate');
goog.require('worldco.Player');
goog.require('worldco.Stuff');
goog.require('worldco.TrashCan');

worldco.Terminal = function(airport) {
    goog.base(this);

    this.airport_ = airport;
    this.paused_ = false;
    this.appendChild(new lime.Label().setSize(WIDTH, 50).setFontSize(30)
            .setText("Welcome to "+airport.name()).setPosition(WIDTH/2, 100));

    this.TERMINAL_WIDTH = 1000;
    this.TERMINAL_TOP = HEIGHT/2 - 100;
    this.TERMINAL_MIDDLE = HEIGHT/2;
    this.airport_ = airport;
    this.appendChild(new lime.Sprite().setSize(1000, 200).setFill('#ddd')
                     .setPosition(WIDTH/2, HEIGHT/2).setStroke(1, '#000'));
    this.addStuff_();
    this.addPlayer_();
    this.addState_();

    lime.scheduleManager.schedule(this.tick_, this);
};

goog.inherits(worldco.Terminal, lime.Scene);

worldco.Terminal.prototype.makeGates_ = function() {
    var outgoing = this.airport_.getOutgoing();
    var distance_between_gates = Math.floor(
        this.TERMINAL_WIDTH/(outgoing.length * LEN));
    for (var i in outgoing) {
        var dest = outgoing[i];
        var stuff_index = distance_between_gates * i;

        var gate = new worldco.Gate(dest);
        this.stuff_[stuff_index] = gate;
        gate.setPosition(stuff_index * LEN, this.TERMINAL_TOP);
        this.appendChild(gate);
    }
};

worldco.Terminal.prototype.addStuff_ = function() {
    this.stuff_ = new Array(Math.floor(this.TERMINAL_WIDTH/LEN));
    for (var i = 0; i < this.stuff_.length; ++i) {
        this.stuff_[i] = worldco.Stuff.NOTHING;
    }
    this.makeGates_();
    this.makeTrashCans_();
    this.makeMooks_();
};

worldco.Terminal.prototype.getEmptyPos_ = function() {
    var trash_pos = goog.math.randomInt(this.stuff_.length);
    while (this.stuff_[trash_pos] != worldco.Stuff.NOTHING) {
        ++trash_pos;
        if (trash_pos == this.stuff_.length) {
            trash_pos = 0;
        }
    }
    return trash_pos;
};

worldco.Terminal.prototype.makeTrashCans_ = function() {
    var NUM_TRASHCANS = 3;
    for (var i = 0; i < NUM_TRASHCANS; ++i) {
        var trash_pos = this.getEmptyPos_();
        this.stuff_[trash_pos] = new worldco.TrashCan();
        this.appendChild(this.stuff_[trash_pos]
                         .setPosition(trash_pos*LEN, 300));
    }
};

worldco.Terminal.prototype.makeMooks_ = function() {
    var mook_pos = this.getEmptyPos_();
    var clue = worldco.map.getClue(this.airport_);
    this.stuff_[mook_pos] = new worldco.ClueMook(clue);
    this.appendChild(this.stuff_[mook_pos]
                     .setPosition(mook_pos*LEN, 300));
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
