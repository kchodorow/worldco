goog.provide('worldco.Airport');
goog.provide('worldco.AirportMap');

worldco.AirportMap = function() {
    this.cities_ = {};
    this.start_ = new worldco.Airport("New York");
    this.dest_ = new worldco.Airport("Boston");
    this.cities_[this.start_.name()] = this.start_;
    this.cities_[this.dest_.name()] = this.dest_;

    this.cities_by_depth_ = {};
    for (var i = 0; i < worldco.AirportMap.MAX_DEPTH; ++i) {
        this.cities_by_depth_[i] = [];
    }
    this.cities_by_depth_['0'] = [this.start_];

    var last_city = null;
    for (i = 0; i < worldco.AirportMap.MAX_BREADTH; ++i) {
        last_city = this.generateMap_(this.start_);
    }

    last_city.addOutgoing(this.dest_);
    this.finishConnections_();
    this.names_ = Object.keys(this.cities_);
};

worldco.AirportMap.prototype.getStart = function() {
    return this.start_;
};

worldco.AirportMap.prototype.getRandom = function() {
    return this.cities_[this.names_[goog.math.randomInt(this.names_.length)]];
};

worldco.AirportMap.prototype.getAirport = function(name) {
    if (!(name in this.cities_)) {
        throw new ReferenceError('No city named '+name);
    }
    return this.cities_[name];
};

// current = 1
// MAX = 4
// generate between 2 & 3
// generate 0, or 1
// next = current + 1 + generated
worldco.AirportMap.prototype.getClue = function(current) {
    var depth = current.depth();
    var generated = goog.math.randomInt(worldco.AirportMap.MAX_DEPTH - depth - 1);
    var tier_index = depth + generated + 1;
    var tier = this.cities_by_depth_[tier_index];
    var source = tier[goog.math.randomInt(tier.length)];
    var outgoing = source.getOutgoing();
    var dest = outgoing[goog.math.randomInt(outgoing.length)];
    return {to : dest.name(), from : source.name()};
};

worldco.AirportMap.prototype.finishConnections_ = function() {
    // Connect airports to lesser airports.
    for (var i in this.cities_by_depth_) {
        for (var j = 0; j < this.cities_by_depth_[i].length; ++j) {
            if (goog.math.randomInt(2) == 0) {
                // No special outgoing.
                continue;
            }

            var city = this.cities_by_depth_[i][j];
            // Choose a random tier.
            var tier = this.cities_by_depth_[goog.math.randomInt(city.depth())];
            // Choose a random city from that tier.
            var dest = tier[goog.math.randomInt(tier.length)];
            city.addOutgoing(dest);
        }
    }
};

worldco.AirportMap.prototype.generateMap_ = function(last_city) {
    if (last_city.depth() >= worldco.AirportMap.MIN_DEPTH
        && (last_city.depth() >= worldco.AirportMap.MAX_DEPTH - 1
        || goog.math.randomInt(2) == 0)) {
        return last_city;
    }

    var next_city = new worldco.Airport(
        worldco.AirportMap.CITIES[index++], last_city);
    this.cities_[next_city.name()] = next_city;
    last_city.addOutgoing(next_city);
    this.cities_by_depth_[next_city.depth()].push(next_city);
    return this.generateMap_(next_city);
};

var index = 0;
worldco.AirportMap.CITIES = [
    "Bejing",
    "Buenos Aires",
    "Caracas",
    "Chicago",
    "Houston",
    "Kingston",
    "Lisbon",
    "London",
    "Mexico City",
    "Paris",
    "Rome",
    "San Diego",
    "San Fransisco",
    "Stockholm",
    "Tokyo"
];

worldco.AirportMap.MIN_DEPTH = 3;
worldco.AirportMap.MAX_DEPTH = 4;
worldco.AirportMap.MIN_BREADTH = 3;
worldco.AirportMap.MAX_BREADTH = 4;

worldco.Airport = function(name, parent) {
    this.name_ = name;
    if (parent == null) {
        this.outgoing_ = [];
        this.depth_ = 0;
    } else {
        this.outgoing_ = [parent];
        this.depth_ = parent.depth() + 1;
    }
};

worldco.Airport.prototype.toString = function() {
    var strs = this.outgoing_.map(function(cur) { return cur.name(); });
    return this.name_ + " (" + this.depth_ + "): " + strs.join(" ");
};

worldco.Airport.prototype.name = function() {
    return this.name_;
};

worldco.Airport.prototype.depth = function() {
    return this.depth_;
};

worldco.Airport.prototype.addOutgoing = function(city) {
    this.outgoing_.push(city);
};

worldco.Airport.prototype.getOutgoing = function() {
    return this.outgoing_;
};
