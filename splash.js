goog.provide('worldco.IntroScene');

goog.require('lime.Scene');

worldco.Splash = {
    BASELINE: 100,
    LINE_HEIGHT: 100
};

worldco.Splash.logo = function() {
    var logo_holder = new lime.Sprite()
            .setPosition(WIDTH/2, worldco.Splash.BASELINE);
    var logo = worldco.resources.getLogo().setScale(2, 2)
            .setPosition(-300, 0);
    var logo_text = worldco.resources.getLabel("WorldCo Airlines")
            .setFontSize(LEN*2).setPosition(50, 0);
    var tagline = worldco.resources.getLabel("Connecting worlds")
            .setPosition(230, worldco.Splash.LINE_HEIGHT - 30)
            .setStyle('italic');
    logo_holder.appendChild(logo);
    logo_holder.appendChild(logo_text);
    logo_holder.appendChild(tagline);
    return logo_holder;
};

worldco.IntroScene = function() {
    goog.base(this);

    var logo = worldco.Splash.logo();
    var apology = worldco.resources.getLabel(
        "We regret to inform you that your flight from\n"
            + "New York to Boston has been cancelled.\n\nHave a great day!")
            .setFontSize(LEN)
            .setPosition(WIDTH/2, worldco.Splash.BASELINE +
                         2.5*worldco.Splash.LINE_HEIGHT);

    var directions = worldco.resources.getLabel(
        "Press left and right to move around the terminal.\nUp or down to "
            + "interact.\n\"M\" mutes or unmutes the muzak.\n"
            + "Enter to continue.")
            .setPosition(WIDTH/2, worldco.Splash.BASELINE +
                         5*worldco.Splash.LINE_HEIGHT);

    this.appendChild(logo);
    this.appendChild(apology);
    this.appendChild(directions);

    var keyboard = new lib.Keyboard(this);
    keyboard.bind(goog.events.KeyCodes.M,
                  goog.bind(worldco.resources.mute, worldco.resources));
    keyboard.bind(goog.events.KeyCodes.ENTER, function(e) {
        var jfk = worldco.map.getStart();
        worldco.terminals['New York'] = jfk;
        worldco.director.replaceScene(
            new worldco.Terminal(jfk));
    });
};

goog.inherits(worldco.IntroScene, lime.Scene);

worldco.OutroScene = function() {
    goog.base(this);

    var BASELINE = 100;
    var LINE_HEIGHT = 100;
    var logo = worldco.resources.getLabel("WorldCo Airlines").setFontSize(LEN)
            .setPosition(WIDTH/2, BASELINE);
    var tagline = worldco.resources.getLabel("Connecting worlds")
            .setPosition(WIDTH/2, BASELINE + LINE_HEIGHT);

    var apology = worldco.resources.getLabel(
        "Thank you for flying the friendly skies with WorldCo! Have a great\n"
            + "day in Boston, or wherever your final destination may be.")
            .setPosition(WIDTH/2, BASELINE + 3*LINE_HEIGHT);

    this.appendChild(logo);
    this.appendChild(tagline);
    this.appendChild(apology);
};

goog.inherits(worldco.OutroScene, lime.Scene);
