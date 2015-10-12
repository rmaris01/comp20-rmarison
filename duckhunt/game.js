//game.js
//by Rachel Marison

var canvas;
var ctx;
var backgroundImage;
var duckImage;
var ducks = new Array();
var duck1x;
var duck1y;
var duck2x;
var duck2y;
var duckWidth;
var duckHeight;
var wingsGoingDown;
var wingsMiddle;

function init() {
	canvas = document.getElementById("game_canvas");
	ctx = canvas.getContext("2d");

	backgroundImage = new Image();
	backgroundImage.src = 'duckhunt-background.gif'

	duckImage = new Image();
	duckImage.src = 'duckhunt_various_sheet.png'

	//starting x and y points for the two ducks on the canvas
	duck1x = 250;
	duck1y = 75;
	duck2x = 475;
	duck2y = 200;
	
	duckWidth = 108;
	duckHeight = 78;
	
	wingsGoingDown = false;  //the duck's wing is starting to flap down
	wingsMiddle = false;     //the duck's wing is in the middle

	makeSpriteLocations();
	drawBackground();

	backgroundImage.onload = function() {	
		ctx.drawImage(duckImage, ducks[0].sx, ducks[0].sy, ducks[0].sWidth, ducks[0].sHeight, duck1x, duck1y, duckWidth, duckHeight);
		ctx.drawImage(duckImage, ducks[3].sx, ducks[3].sy, ducks[3].sWidth, ducks[3].sHeight, duck2x, duck2y, duckWidth, duckHeight);
		setInterval(animate, 125);
	}
}

function drawBackground() {
	ctx.drawImage(backgroundImage, 0, 0, 800, 600);
}

function makeSpriteLocations() {

	//Pixel locations for animation of the first duck
	ducks[0] = {"sx": 0, "sy": 113, "sWidth": 34, "sHeight": 30}
	ducks[1] = {"sx": 40, "sy": 113, "sWidth": 34, "sHeight": 30}
	ducks[2] = {"sx": 81, "sy": 118, "sWidth": 34, "sHeight": 30}

	//Pixel locations for animation of the second duck
	ducks[3] = {"sx": 130, "sy": 113, "sWidth": 34, "sHeight": 30}
	ducks[4] = {"sx": 170, "sy": 113, "sWidth": 34, "sHeight": 30}
	ducks[5] = {"sx": 211, "sy": 118, "sWidth": 34, "sHeight": 30}

}

function animate() {
	drawBackground()

	if (wingsMiddle) {
		if (wingsGoingDown) {
			ctx.drawImage(duckImage, ducks[0].sx, ducks[0].sy, ducks[0].sWidth, ducks[0].sHeight, duck1x, duck1y, 108, 78);
			ctx.drawImage(duckImage, ducks[3].sx, ducks[3].sy, ducks[3].sWidth, ducks[3].sHeight, duck2x, duck2y, 108, 78);
		} else if (!wingsGoingDown) {
			ctx.drawImage(duckImage, ducks[2].sx, ducks[2].sy, ducks[2].sWidth, ducks[2].sHeight, duck1x, duck1y, 108, 78);
			ctx.drawImage(duckImage, ducks[5].sx, ducks[5].sy, ducks[5].sWidth, ducks[5].sHeight, duck2x, duck2y, 108, 78);
		}
		wingsMiddle = false;
		wingsGoingDown = !wingsGoingDown
	} else if (!wingsMiddle){
		ctx.drawImage(duckImage, ducks[1].sx, ducks[1].sy, ducks[1].sWidth, ducks[1].sHeight, duck1x, duck1y, 108, 78);
		ctx.drawImage(duckImage, ducks[4].sx, ducks[4].sy, ducks[4].sWidth, ducks[4].sHeight, duck2x, duck2y, 108, 78);
		wingsMiddle = true;
	} 
}



