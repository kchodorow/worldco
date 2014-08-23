goog.provide('worldco.Player');

goog.require('lime.Sprite');

worldco.Player = function() {
    goog.base(this);

    this.appendChild(worldco.resources.getPlayer().setScale(2, 2));
    this.setPosition(WIDTH/2, HEIGHT * .8);
    this.MAX_SPEED = .4;
    this.STOP = new goog.math.Coordinate(0, 0);
    this.intention_ = this.STOP;
    this.is_interacting_ = false;
};

goog.inherits(worldco.Player, lime.Sprite);

worldco.Player.prototype.isMoving = function() {
    return !this.intention_.equals(this.STOP);
};

worldco.Player.prototype.isInteracting = function() {
    return this.is_interacting_;
};

worldco.Player.prototype.setIntention = function(dir) {
    if (dir.y != 0) {
        this.is_interacting_ = true;
    } else {
        this.intention_ = dir;
    }
};

worldco.Player.prototype.move = function(delta) {
    var pos = this.getPosition();
    var direction = this.intention_;
    pos.x += direction.x * this.MAX_SPEED * delta,
    this.setIntention(this.STOP);
    this.setPosition(pos);
    this.is_interacting_ = false;
};
