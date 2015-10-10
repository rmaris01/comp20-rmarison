//game.js
//by Rachel Marison

function init() {
var canvas = document.getElementById("game_canvas");
var ctx = canvas.getContext("2d");

var backgroundImage = new Image();
backgroundImage.addEventListener("load", function() {
	ctx.drawImage(backgroundImage, 0, 0, 800, 600);
}, false);
backgroundImage.src = 'duckhunt-background.gif'

ctx.fillStyle = "green";
ctx.fillRect(0, 0, 100, 100);
}