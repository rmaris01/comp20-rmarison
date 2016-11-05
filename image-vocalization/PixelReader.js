function getImgData(img, sweep, imgContext) {
	//set x, y, width, and height here based on what sweeping pattern is used
	var reqs = getSweepRequirements(img, sweep);
	var pixelGroups = [];

	//get averages for each chunk of pixels, and store in array
	while (reqs.x < img.width) {
		var averages = getRGBAverages(reqs, imgContext);
		pixelGroups.push({
			red: averages.red,
			green: averages.green,
			blue: averages.blue,
			alpha: averages.alpha
		});

		//set new x, y, width, and height here. This will also differ depending
		//on the sweeping pattern
		reqs = updateSweepRequirements(img, sweep, reqs);
	}

	return pixelGroups;
}

function getRGBAverages(reqs, imgContext) {
	var imageData = imgContext.getImageData(reqs.x, reqs.y, reqs.width, reqs.height);
	var pixelData = imageData.data;
	var numPixels = pixelData.length / 4;
	var redSum = greenSum = blueSum = alphaSum = 0;
	var redAverage = greenAverage = blueAverage = alphaAverage = 0;

	for (i = 0; i < pixelData.length; i++) {
		if (i % 4 == 0) { //red
			redSum += pixelData[i];
		} else if (i % 4 == 1) { //green
			greenSum += pixelData[i];
		} else if (i % 4 == 2) { //blue
			blueSum += pixelData[i];
		} else if (i % 4 == 3) { //alpha
			alphaSum += pixelData[i];
		}
	}
	redAverage = redSum / numPixels;
	greenAverage = greenSum / numPixels;
	blueAverage = blueSum / numPixels;
	alphaAverage = alphaSum / numPixels;

	return {
		red: redAverage,
		green: greenAverage,
		blue: blueAverage,
		alpha: alphaAverage
	};
}