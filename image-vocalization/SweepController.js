function getSweepRequirements(img, sweep) {
	var verticalWidth = Math.ceil(img.width / 25);
	var horizontalHeight = Math.ceil(img.height / 25);
	switch(sweep) {
		case 'right-to-left':
		case 'left-to-right':
			return {
				x: 0,
				y: 0,
				width: verticalWidth,
				height: img.height
			};
		case 'bottom-to-top':
		case 'top-to-bottom':
			return {
				x: 0,
				y: 0,
				width: img.width,
				height: horizontalHeight
			};
	}
}

function updateSweepRequirements(img, sweep, currentReqs) {
	var verticalWidth = Math.ceil(img.width / 25);
	var horizontalHeight = Math.ceil(img.height / 25);
	switch(sweep) {
		case 'right-to-left':
		case 'left-to-right':
			return {
				x: currentReqs.x += currentReqs.width,
				y: 0,
				width: verticalWidth,
				height: img.height
			};
		case 'bottom-to-top':
		case 'top-to-bottom':
			return {
				x: 0,
				y: currentReqs.y += currentReqs.height,
				width: img.width,
				height: horizontalHeight
			};
	}
}

function stillSweeping(reqs, img) {
	switch(sweep) {
		case 'right-to-left':
		case 'left-to-right':
			return (reqs.x < img.width);
		case 'bottom-to-top':
		case 'top-to-bottom':
			return (reqs.y < img.height);
	}
}