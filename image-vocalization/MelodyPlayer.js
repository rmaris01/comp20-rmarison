var uploadedImg;
var sweep;
var key;
var instrument;
var currentTimeout;
var canvas;
var imgContext;
var oldSweepPos;

function play() {
	var pixelGroups;

	if (!setUpCorrectly()) {
		return;
	}

	imgContext.clearRect(0, 0, canvas.width, canvas.height);
	imgContext.drawImage(uploadedImg, 0, 0);
	pixelGroups = getImgData(uploadedImg, sweep, imgContext);
	oldSweepPos = drawInitSweeper(sweep, canvas, imgContext);
	createAndPlayMelody(pixelGroups, key, sweep, instrument);
}

function setUpCorrectly() {
	//img = document.getElementById('user-img');
	if (uploadedImg == undefined) {
		alert("Please upload an image before playing.");
		return false;
	}

	// sweep = $('#sweep-form input[type=radio]:checked').val();
	sweep = $('#sweeper-picker').find(':selected').val();
	console.log(sweep);
	if (sweep == "") {
			alert("Please select a sweeping pattern before playing.");
			return false;
	}

	// key = $('#key-form input[type=radio]:checked').val();
	key = $('#key-picker').find(':selected').val();

	if (key == "") {
		alert("Please select a key before playing.");
		return false;
	}

	instrument = $('#instrument-picker').find(':selected').val();

	if (instrument == "") {
		alert("Please select an instrument before playing.");
		return false;
	}

	return true;
}

function setUpCanvas(event) {
	// var canvas = document.createElement('canvas');
	// canvas.width = img.width;
	// canvas.height = img.height;
	// return canvas;

	//$('#user-img').attr('src', e.target.result);
	canvas=document.getElementById("my-canvas");
	imgContext=canvas.getContext("2d");
	uploadedImg = new Image();
    uploadedImg.onload = function(){
        canvas.width = uploadedImg.width;
        canvas.height = uploadedImg.height;
        imgContext.drawImage(uploadedImg, 0, 0);
    }
    uploadedImg.src = event.target.result;
    canvas.setAttribute("src", "1");
}

function createAndPlayMelody(pixelGroups, key, sweep, instrument) {
	notesData = [];
	for (var i = 0; i < pixelGroups.length; i++) {
		var redNote = getPitchInKey(pixelGroups[i].red, key);
		var greenNote = getPitchInKey(pixelGroups[i].green, key);
		var blueNote = getPitchInKey(pixelGroups[i].blue, key);
		var duration = getNoteLength(notesData, pixelGroups, i);
		var luminosity = 0.2126*pixelGroups[i].red + 0.7152*pixelGroups[i].green + 0.0722*pixelGroups[i].blue;
		// var sweeps = pixelGroups[i].reqs;

		notesData.push({
			redNote: redNote,
			greenNote: greenNote,
			blueNote: blueNote,
			duration: duration,
			lum: luminosity,
			// sweeps: sweeps
		});
	}

	// for (var i = 0; i < notesData.length; i++) {
	// 	// console.log("redNote: " + notesData[i].redNote);
	// 	// console.log("greenNote: " + notesData[i].greenNote);
	// 	// console.log("blueNote: " + notesData[i].blueNote);
	// 	//console.log("duration: " + notesData[i].duration);
	// 	console.log(notesData[i].sweeps);
	// 	console.log("");
	// }			

console.log(instrument);
	MIDI.loadPlugin({
	    soundfontUrl: "http://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/",
	    instrument: instrument,
	    onsuccess: function() {
	    	MIDI.programChange(0, MIDI.GM.byName[instrument].number);
	    	setTimeout(function(){setTimedFilters(0, notesData);}, 500);
	    	playNotes(0, 0.5, notesData);
	    }
	});
}

function playNotes(i, clockDelay, notesData) {
	if (i < notesData.length) {
        var velocity = 127; 
        MIDI.setVolume(0, 127);
        MIDI.chordOn(0, [notesData[i].redNote, notesData[i].greenNote, notesData[i].blueNote], velocity, clockDelay);
    	MIDI.chordOff(0, [notesData[i].redNote, notesData[i].greenNote, notesData[i].blueNote], clockDelay + notesData[i].duration);
    	clockDelay += notesData[i].duration;
    	playNotes(i+1, clockDelay, notesData);
	} else {
			console.log('done');
	}
}

function setTimedFilters(i, notesData) {
	if (i < notesData.length) {
		oldSweepPos = drawNextSweeper(oldSweepPos, canvas, imgContext, sweep);

		setFilters(notesData[i].lum);
		setTimeout(function(){setTimedFilters(i+1, notesData);}, notesData[i].duration*1000);
	}
}

//to use soundfont-player:
//var audioContext = new AudioContext();
//var schedule;

// console.log(luminosity);
	// schedule = [];
	// var clock = 0;
	
	// for (var i = 0; i < pixelGroups.length; i++) {
	// 	var frequency = Math.floor(pixelGroups[i].red % 88) + 21;
	// 	var noteLength = getNoteLength(pixelGroups[i].green);
	// 	schedule.push({
	// 		time: clock,
	// 		note: frequency
	// 	});
	// 	clock += noteLength;
	// }

	// 	Soundfont.instrument(audioContext, 'acoustic_grand_piano', {attack: 0}).then(function (piano) {
// 			piano.schedule(audioContext.currentTime, schedule)
	// });
