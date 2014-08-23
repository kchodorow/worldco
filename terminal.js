goog.provide('worldco.Terminal');

goog.require('lime.Scene');

worldco.Terminal = function(airport) {
    goog.base(this);

    var lbl = new lime.Label().setSize(800, 500).setFontSize(30)
            .setText(airport.toString()).setPosition(512, 378);
    this.appendChild(lbl);
};

goog.inherits(worldco.Terminal, lime.Scene);
