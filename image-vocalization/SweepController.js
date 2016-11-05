function getSweepRequirements(img, sweep) {
	var verticalWidth = img.width / 25;
	var horizontalHeight = img.height / 25;
	switch(sweep) {
		case 'left-to-right':
			return {
				x: 0,
				y: 0,
				width: verticalWidth,
				height: img.height
			};
		case 'right-to-left':
			return {
				x: img.width - verticalWidth,
				y: 0,
				width: verticalWidth,
				height: img.height
			};
	}
}

function updateSweepRequirements(img, sweep, currentReqs) {
	var verticalWidth = img.width / 25;
	var horizontalHeight = img.height / 25;
	switch(sweep) {
		case 'left-to-right':
			return {
				x: currentReqs.x += currentReqs.width,
				y: 0,
				width: verticalWidth,
				height: img.height
			};
		case 'right-to-left':
			return {
				x: currentReqs.x -= currentReqs.width,
				y: 0,
				width: verticalWidth,
				height: img.height
			};
	}
}

function stillSweeping(reqs, img) {
	switch(sweep) {
		case 'left-to-right':
			return (reqs.x < img.width);
		case 'right-to-left':
			return (reqs.x >= 0)
	}
}