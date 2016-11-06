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
		case 'blocked':
			return {
				x: 0,
				y: 0,
				width: 25,
				height: 25
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
		case 'blocked':
			if (currentReqs.x + 25 >= img.width && currentReqs.y + 25 >= img.height) {
				return {
					x: currentReqs.x + 25,
					y: currentReqs.y + 25,
					width: 25,
					height: 25
				};
			} else if (currentReqs.x + 25 >= img.width) {
				return {
					x: 0,
					y: currentReqs.y + 25,
					width: 25,
					height: 25
				};
			} else {
				return {
					x: currentReqs.x + 25,
					y: currentReqs.y,
					width: 25,
					height: 25
				};
			}
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
		case 'blocked':
			return (reqs.x < img.width || reqs.y < img.height) //stop when you're in the bottom left corner 
	}
}