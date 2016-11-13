var NUM_NOTES = 25;

function getSweepRequirements(img, sweep) {
	var verticalWidth = Math.ceil(img.width / NUM_NOTES);
	var horizontalHeight = Math.ceil(img.height / NUM_NOTES);
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

function updateSweepRequirements(img, sweep, oldReqs) {
	var verticalWidth = Math.ceil(img.width / NUM_NOTES);
	var horizontalHeight = Math.ceil(img.height / NUM_NOTES);
	var verticalWidthBlocked = Math.ceil(img.width / 5);
	var horizontalHeightBlocked = Math.ceil(img.height / 5);
	switch(sweep) {
		case 'right-to-left':
		case 'left-to-right':
			return {
				x: oldReqs.x += oldReqs.width,
				y: 0,
				width: verticalWidth,
				height: img.height
			};
		case 'bottom-to-top':
		case 'top-to-bottom':
			return {
				x: 0,
				y: oldReqs.y += oldReqs.height,
				width: img.width,
				height: horizontalHeight
			};
		case 'blocked':
			if (oldReqs.x + verticalWidthBlocked >= img.width && oldReqs.y + horizontalHeightBlocked >= img.height) {
				return {
					x: oldReqs.x + verticalWidthBlocked,
					y: oldReqs.y + horizontalHeightBlocked,
					width: verticalWidthBlocked,
					height: horizontalHeightBlocked
				};
			} else if (oldReqs.x + verticalWidthBlocked >= img.width) {
				return {
					x: 0,
					y: oldReqs.y + horizontalHeightBlocked,
					width: verticalWidthBlocked,
					height: horizontalHeightBlocked
				};
			} else {
				return {
					x: oldReqs.x + verticalWidthBlocked,
					y: oldReqs.y,
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

function getSweepStart(sweep, canvas) {
	switch(sweep) {
		case 'right-to-left':
			return {
					x1: canvas.width,
					y1: 0,
					x2: canvas.width,
					y2: canvas.height
			};
		case 'left-to-right':
			return {
					x1: 0,
					y1: 0,
					x2: 0,
					y2: canvas.height
			};
		case 'bottom-to-top':
			return {
					x1: 0,
					y1: canvas.height,
					x2: canvas.width,
					y2: canvas.height
			};
		case 'top-to-bottom':
			return {
					x1: 0,
					y1: 0,
					x2: canvas.width,
					y2: 0
			};
		case 'blocked':
	}
}

function adjustSweepReqsBySweep(sweepReqs) {
	switch(sweep) {
		case 'right-to-left':
			return {
					x1: sweepReqs.x,
					y1: sweepReqs.y,
					x2: sweepReqs.x,
					y2: sweepReqs.height
			};
		case 'left-to-right':
			return {
					x1: sweepReqs.x + sweepReqs.width,
					y1: sweepReqs.y,
					x2: sweepReqs.x + sweepReqs.width,
					y2: sweepReqs.height
			};
		case 'bottom-to-top':
			return {
					x1: sweepReqs.x,
					y1: sweepReqs.y,
					x2: sweepReqs.width,
					y2: sweepReqs.y
			};
		case 'top-to-bottom':
			return {
					x1: sweepReqs.x,
					y1: sweepReqs.y + sweepReqs.height,
					x2: sweepReqs.width,
					y2: sweepReqs.y + sweepReqs.height
			};
		case 'blocked':
	}
}

function drawInitSweeper(sweep, canvas, imgContext) {
	imgContext.beginPath();
	imgContext.lineWidth = "5";
	imgContext.strokeStyle = "red";

	var sweepReqs = getSweepStart(sweep, canvas);

	imgContext.moveTo(sweepReqs.x1, sweepReqs.y1);
	imgContext.lineTo(sweepReqs.x2, sweepReqs.y2);
	imgContext.stroke(); 
}

// essentially draw the sweeper in the "ending" location on the img for that pixel group
function drawNextSweeper(sweepReqs, canvas, imgContext){
	imgContext.clearRect(0, 0, canvas.width, canvas.height);
	imgContext.drawImage(uploadedImg, 0, 0);

	imgContext.beginPath();
	imgContext.lineWidth = "5";
	imgContext.strokeStyle = "red";

	sweepReqs = adjustSweepReqsBySweep(sweepReqs);

	imgContext.moveTo(sweepReqs.x1, sweepReqs.y1);
	imgContext.lineTo(sweepReqs.x2, sweepReqs.y2);
	imgContext.stroke();
}
