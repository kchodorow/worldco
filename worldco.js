goog.provide('worldco');

goog.require('lime.Director');

goog.require('worldco.AirportMap');
goog.require('worldco.FinalTerminal');
goog.require('worldco.State');
goog.require('worldco.Terminal');
goog.require('worldco.data.Resources');

var WIDTH = 1024;
var HEIGHT = 768;
var LEN = 44;

worldco.start = function(){
    worldco.resources = new worldco.data.Resources();

    worldco.game_state = new worldco.State();
    worldco.map = new worldco.AirportMap();
    var jfk = worldco.map.getStart();
    worldco.terminals = {};
    worldco.terminals['New York'] = jfk;

    worldco.director = new lime.Director(document.body,1024,768);
    var scene = new worldco.Terminal(jfk);
    worldco.terminals["Boston"] = new worldco.FinalTerminal(
        worldco.map.getAirport("Boston"));

    worldco.director.replaceScene(scene);
};

goog.exportSymbol('worldco.start', worldco.start);
