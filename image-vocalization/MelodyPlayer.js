var img;
var sweep;
var key;
var currentTimeout;

function play() {
	var canvas;
	var imgContext;
	var pixelGroups;

	if (!setUpCorrectly()) {
		return;
	}

	canvas = setUpCanvas(img);
	imgContext = canvas.getContext('2d');
	imgContext.drawImage(img, 0, 0);
	pixelGroups = getImgData(img, sweep, imgContext);
	createAndPlayMelody(pixelGroups, key);
}

function setUpCorrectly() {
	img = document.getElementById('user-img');
	if (img.getAttribute('src') == '#') {
		alert("Please upload an image before playing.");
		return false;
	}

	sweep = $('#sweep-form input[type=radio]:checked').val();
	if (sweep == undefined) {
		alert("Please select a sweeping pattern before playing.");
		return false;
	}

	key = $('#key-form input[type=radio]:checked').val();
	if (key == undefined) {
		alert("Please select a key before playing.");
		return false;
	}

	return true;
}

function setUpCanvas(img) {
	var canvas = document.createElement('canvas');
	canvas.width = img.width;
	canvas.height = img.height;
	return canvas;
}

function createAndPlayMelody(pixelGroups, key) {

	notesData = [];
	for (var i = 0; i < pixelGroups.length; i++) {
		var redNote = getPitchInKey(pixelGroups[i].red, key);
		var greenNote = getPitchInKey(pixelGroups[i].green, key);
		var blueNote = getPitchInKey(pixelGroups[i].blue, key);
		var duration = getNoteLength(notesData, pixelGroups, i);
		var luminosity = 0.2126*pixelGroups[i].red + 0.7152*pixelGroups[i].green + 0.0722*pixelGroups[i].blue;

		notesData.push({
			redNote: redNote,
			greenNote: greenNote,
			blueNote: blueNote,
			duration: duration,
			lum: luminosity
		});
	}

	// for (var i = 0; i < notesData.length; i++) {
	// 	// console.log("redNote: " + notesData[i].redNote);
	// 	// console.log("greenNote: " + notesData[i].greenNote);
	// 	// console.log("blueNote: " + notesData[i].blueNote);
	// 	//console.log("duration: " + notesData[i].duration);
	// 	console.log("");
	// }			

	MIDI.loadPlugin({
	    soundfontUrl: "http://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/",
	    instrument: "acoustic_grand_piano",
	    onsuccess: function() {
	    	playNotes(0, notesData);
	    }
	});
}


//maybe use jsmidi?
function playNotes(i, notesData) {
	// if (currentTimeout) {
	// 	clearTimeout(currentTimeout);
	// }
	if (i < notesData.length) {
		setFilters(notesData[i].lum);
		
        var delay = 0; 
        var velocity = 127; 
        MIDI.setVolume(0, 127);
        MIDI.chordOn(0, [notesData[i].redNote, notesData[i].greenNote, notesData[i].blueNote], velocity, delay);
    	MIDI.chordOff(0, [notesData[i].redNote, notesData[i].greenNote, notesData[i].blueNote], notesData[i].duration);
        sleep(notesData[i].duration).then(() => {
    	//currentTimeout = setTimeout(function() { playNotes(i+1, notesData); }, notesData[i].duration);
    	playNotes(i+1, notesData);
        });
	} else {
			console.log('done');
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
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
