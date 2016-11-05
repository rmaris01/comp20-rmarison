function getSweepRequirements(img, sweep) {
	switch(sweep) {
		case 'left-to-right':
			return {
				x: 0,
				y: 0,
				width: img.width / 25,
				height: img.height
			};
	}
}

function updateSweepRequirements(img, sweep, currentReqs) {
	if (sweep == 'left-to-right') {
		return {
			x: currentReqs.x += currentReqs.width,
			y: 0,
			width: img.width / 25,
			height: img.height
		};
	}
}