goog.provide('worldco');

goog.require('lime.Director');

goog.require('worldco.AirportMap');
goog.require('worldco.FinalTerminal');
goog.require('worldco.IntroScene');
goog.require('worldco.State');
goog.require('worldco.Terminal');
goog.require('worldco.data.Resources');

var WIDTH = 1024;
var HEIGHT = 768;
var LEN = 44;

worldco.start = function(){
    worldco.resources = new worldco.data.Resources();
    worldco.map = new worldco.AirportMap();
    worldco.game_state = new worldco.State();
    worldco.terminals = {};

    worldco.director = new lime.Director(document.body,1024,768);
    worldco.terminals["Boston"] = new worldco.FinalTerminal(
        worldco.map.getAirport("Boston"));

    worldco.director.replaceScene(new worldco.IntroScene());
};

goog.exportSymbol('worldco.start', worldco.start);
