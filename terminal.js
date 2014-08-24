goog.provide('worldco.Terminal');

goog.require('lime.animation.Easing');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Sequence');
goog.require('lime.Label');
goog.require('lime.Scene');
goog.require('lime.Sprite');

goog.require('lib.Keyboard');
goog.require('worldco.ClueMook');
goog.require('worldco.HelpDesk');
goog.require('worldco.Gate');
goog.require('worldco.OutroScene');
goog.require('worldco.Player');
goog.require('worldco.Stuff');
goog.require('worldco.TrashCan');

worldco.Terminal = function(airport) {
    goog.base(this);

    this.airport_ = airport;
    this.paused_ = false;

    this.appendChild(
        new lime.Sprite().setSize(WIDTH, HEIGHT)
            .setFill(worldco.resources.LIGHT_BLUE)
            .setPosition(WIDTH/2, HEIGHT/2));
    this.appendChild(worldco.resources.getLogo().setPosition(70, 100));
    this.appendChild(worldco.resources.getLabel("Welcome to "+airport.name()
                                                + "!")
                     .setSize(WIDTH, 50).setFontSize(LEN)
                     .setPosition(300, 100));

    this.TERMINAL_WIDTH = 1000;
    this.TERMINAL_TOP = HEIGHT/2 - 100;
    this.TERMINAL_MIDDLE = HEIGHT/2;
    this.BASELINE_ = 350;
    this.GATES = this.BASELINE_;
    this.PEDESTRIANS = this.BASELINE_ + 70;
    this.PLAYER = this.BASELINE_ + 140;
    this.TSA = this.BASELINE_ + 210;

    this.addStuff_();
    this.addPlayer_();
    this.addState_();

    lime.scheduleManager.schedule(this.tick_, this);
};

goog.inherits(worldco.Terminal, lime.Scene);

worldco.Terminal.prototype.makeGates_ = function() {
    var outgoing = this.airport_.getOutgoing();
    var distance_between_gates = Math.floor(
        this.TERMINAL_WIDTH/(outgoing.length * (LEN * 2)));
    for (var i in outgoing) {
        worldco.game_state.addClue(
            "There are flights from " + this.airport_.name() + " to "
                + outgoing[i].name());
        var dest = outgoing[i];
        var stuff_index = this.getEmptyPos_();

        var gate = new worldco.Gate(dest);
        this.stuff_[stuff_index] = gate;
        gate.y_ = this.GATES;
        this.appendChild(gate);
    }
};

worldco.Terminal.prototype.addStuff_ = function() {
    this.stuff_ = new Array(Math.floor(this.TERMINAL_WIDTH/(LEN * 2)));
    for (var i = 0; i < this.stuff_.length; ++i) {
        this.stuff_[i] = worldco.Stuff.NOTHING;
    }
    this.makeHelpDesk_();
    this.makeGates_();
    this.makeTrashCans_();
    this.makeMooks_();

    for (var i = 0; i < this.stuff_.length; ++i) {
        if (this.stuff_[i] == worldco.Stuff.NOTHING) {
            continue;
        } else {
            this.stuff_[i].setPosition(i*LEN*2, this.stuff_[i].y_);
        }
    }
};

worldco.Terminal.prototype.makeHelpDesk_ = function() {
    var index = this.getEmptyPos_();
    this.stuff_[index] = new worldco.HelpDesk();
    this.stuff_[index].y_ = this.GATES;
    this.appendChild(this.stuff_[index]);
};

worldco.Terminal.prototype.getEmptyPos_ = function() {
    var trash_pos = goog.math.randomInt(this.stuff_.length-1);
    while (trash_pos == 0 || this.stuff_[trash_pos] != worldco.Stuff.NOTHING) {
        ++trash_pos;
        if (trash_pos == this.stuff_.length-1) {
            trash_pos = 1;
        }
    }
    return trash_pos;
};

worldco.Terminal.prototype.makeTrashCans_ = function() {
    // 1-3 trashcans.
    var NUM_TRASHCANS = goog.math.randomInt(3) + 1;
    for (var i = 0; i < NUM_TRASHCANS; ++i) {
        var trash_pos = this.getEmptyPos_();
        this.stuff_[trash_pos] = new worldco.TrashCan();
        this.stuff_[trash_pos].y_ = this.PEDESTRIANS;
        this.appendChild(this.stuff_[trash_pos]);
    }
};

worldco.Terminal.prototype.makeMooks_ = function() {
    var num_mooks = goog.math.randomInt(2) + 1;
    for (var i = 0; i < num_mooks; ++i) {
        var mook_pos = this.getEmptyPos_();
        var clue = worldco.map.getClue(this.airport_);
        if (this.airport_.name() == worldco.map.getStart().name() && i == 0) {
            var dest = worldco.map.getDestination();
            clue = {to: dest.name(), from: dest.getOutgoing()[0].name()};
        }
        this.stuff_[mook_pos] = new worldco.ClueMook(clue);
        this.stuff_[mook_pos].y_ = this.PEDESTRIANS;
        this.appendChild(this.stuff_[mook_pos]);
    }
};

worldco.Terminal.prototype.addPlayer_ = function() {
    this.player_ = new worldco.Player();
    this.appendChild(this.player_.setPosition(WIDTH/2, this.PLAYER));
    worldco.keyboard = new lib.Keyboard(this);
    worldco.keyboard.bindWasd(
        goog.bind(this.player_.setIntention, this.player_));
    worldco.keyboard.bind(
        goog.events.KeyCodes.M,
        goog.bind(worldco.resources.mute, worldco.resources));
    worldco.keyboard.bind(
        goog.events.KeyCodes.E, function(e) {
            worldco.director.replaceScene(new worldco.OutroScene());
        });
};

worldco.Terminal.prototype.addState_ = function() {
    this.wallet_ = worldco.resources.getLabel(
        '$' + worldco.game_state.getMoney())
        .setSize(120, LEN).setAlign('right').setPosition(WIDTH - 100, 50);
    this.appendChild(this.wallet_);
    var inventory = worldco.resources.getLabel("Inventory")
            .setSize(120, LEN).setAlign('right').setPosition(WIDTH - 100, 85);
    this.appendChild(inventory);
    var log_book = worldco.resources.getLabel("Notes")
            .setSize(120, LEN).setAlign('right').setPosition(WIDTH - 100, 120);
    this.appendChild(log_book);

    var scene = this;
    goog.events.listen(inventory, ['mousedown'], function(e) {
        scene.appendChild(worldco.game_state.getInventorySprite());
    });
    goog.events.listen(log_book, ['mousedown'], function(e) {
        scene.appendChild(worldco.game_state.getLogSprite());
    });
};

worldco.Terminal.prototype.tick_ = function(delta) {
    if (this.paused_) {
        return;
    }

    if (this.player_.isInteracting()) {
        var pos = Math.floor((this.player_.getPosition().x+LEN) / (LEN * 2));
        var found = this.stuff_[pos].interact();
        if (this.stuff_[pos] != worldco.Stuff.NOTHING) {
            this.stuff_[pos].runAction(new lime.animation.Sequence(
                new lime.animation.ScaleTo(1.2, 1.2).setDuration(.4)
                    .setEasing(lime.animation.Easing.LINEAR),
                new lime.animation.ScaleTo(1, 1).setDuration(.4)
                    .setEasing(lime.animation.Easing.LINEAR)
            ));
        } else {
            var nothing = worldco.resources.getLabel("Nothing there.")
                    .setPosition(this.player_.getPosition());
            this.appendChild(nothing);
            nothing.runAction(new lime.animation.FadeTo(0));
        }
        for (var i = 0; i < found.length; ++i) {
            this.appendChild(found[i].setPosition(
                this.stuff_[pos].getPosition()));
            worldco.game_state.addToInventory(found[i]);
        }
    }
    this.player_.move(delta);

    this.wallet_.setText('$' + worldco.game_state.getMoney());
};
