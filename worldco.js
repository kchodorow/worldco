goog.provide('worldco');

goog.require('lime.Director');

goog.require('worldco.AirportMap');
goog.require('worldco.Terminal');

var WIDTH = 1024;
var HEIGHT = 768;
var LEN = 44;

worldco.start = function(){
    var map = new worldco.AirportMap();
    var jfk = map.getStart();

    var director = new lime.Director(document.body,1024,768);
    var scene = new worldco.Terminal(jfk);

    director.replaceScene(scene);
};

goog.exportSymbol('worldco.start', worldco.start);
