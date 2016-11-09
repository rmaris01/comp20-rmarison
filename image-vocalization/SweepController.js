function getSweepRequirements(img, sweep) {
	var verticalWidth = Math.ceil(img.width / 25);
	var horizontalHeight = Math.ceil(img.height / 25);
	var verticalWidthBlocked = Math.ceil(img.width / 5);
	var horizontalHeightBlocked = Math.ceil(img.height / 5);
	console.log("v: " + verticalWidthBlocked);
	console.log("h: " + horizontalHeightBlocked);

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
				width: verticalWidthBlocked,
				height: horizontalHeightBlocked
			};
	}
}

function updateSweepRequirements(img, sweep, currentReqs) {
	var verticalWidth = Math.ceil(img.width / 25);
	var horizontalHeight = Math.ceil(img.height / 25);
	var verticalWidthBlocked = Math.ceil(img.width / 5);
	var horizontalHeightBlocked = Math.ceil(img.height / 5);
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
			if (currentReqs.x + verticalWidthBlocked >= img.width && currentReqs.y + horizontalHeightBlocked >= img.height) {
				return {
					x: currentReqs.x + verticalWidthBlocked,
					y: currentReqs.y + horizontalHeightBlocked,
					width: verticalWidthBlocked,
					height: horizontalHeightBlocked
				};
			} else if (currentReqs.x + verticalWidthBlocked >= img.width) {
				return {
					x: 0,
					y: currentReqs.y + horizontalHeightBlocked,
					width: verticalWidthBlocked,
					height: horizontalHeightBlocked
				};
			} else {
				return {
					x: currentReqs.x + verticalWidthBlocked,
					y: currentReqs.y,
					width: verticalWidthBlocked,
					height: horizontalHeightBlocked
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