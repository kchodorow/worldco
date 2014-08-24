goog.provide('worldco.Player');

goog.require('lime.Sprite');

worldco.Player = function() {
    goog.base(this);

    this.sprite_ = worldco.resources.getPlayer();
    this.appendChild(this.sprite_);
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
        if (dir.x == 1) {
            this.setScale(1, 1);
        } else if (dir.x == -1) {
            this.setScale(-1, 1);
        }
        if (this.intention_.x != dir.x) {
            this.walk_ = worldco.resources.getPlayerWalk();
            this.sprite_.runAction(this.walk_);
        }
        this.intention_ = dir;
    }
};

worldco.Player.prototype.move = function(delta) {
    var pos = this.getPosition();
    var direction = this.intention_;
    pos.x += direction.x * this.MAX_SPEED * delta;
    if (direction.x == 0) {
        if (this.walk_ != null) {
            this.walk_.stop();
        }
        this.sprite_.setFill(worldco.resources.getPlayerFill());
    }
    this.setIntention(this.STOP);
    this.setPosition(pos);
    this.is_interacting_ = false;
};
