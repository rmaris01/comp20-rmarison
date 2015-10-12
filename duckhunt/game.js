//game.js
//by Rachel Marison

function init() {
var canvas = document.getElementById("game_canvas");
var ctx = canvas.getContext("2d");

var backgroundImage = new Image();
backgroundImage.src = 'duckhunt-background.gif'

var ducks = new Image();
ducks.src = 'duckhunt_various_sheet.png'

backgroundImage.addEventListener("load", function() {
	ctx.drawImage(backgroundImage, 0, 0, 800, 600);
	ctx.drawImage(ducks, 39, 122, 36, 22, 225, 170, 108, 66);
	ctx.drawImage(ducks, 129, 120, 36, 26, 425, 100, 108, 78);

}, false);

}