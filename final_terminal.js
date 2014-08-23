goog.provide('worldco.FinalTerminal');

goog.require('lime.Scene');

worldco.FinalTerminal = function(airport) {
    goog.base(this);

    var lbl = new lime.Label().setSize(500, 200).setFontSize(50)
            .setText("Thank you for flying the friendly skies with WorldCo Airlines!")
            .setPosition(0, 0);
    this.appendChild(lbl);
};

goog.inherits(worldco.FinalTerminal, lime.Scene);
