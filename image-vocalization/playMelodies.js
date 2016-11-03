var audioContext = new AudioContext();
var schedule;
var img;
var canvas;
var imgContext;

function play() {
	img = document.getElementById('user-img');
	if(img.getAttribute('src') == '#') {
		alert("Please upload an image before playing.");
		return;
	}
	var sweep;
	if (document.getElementById('left-to-right').checked) {
		sweep = 'left-to-right';
	} else if (document.getElementById('other').checked) {
		sweep = 'other';
	} else {
		alert("Please select a sweeping pattern before playing.");
		return;
	}

	canvas = document.createElement('canvas');
	imgContext = canvas.getContext('2d');
	canvas.width = img.width;
	canvas.height = img.height;
	imgContext.drawImage(img, 0, 0);
	var pixelGroups = getImgData(img, sweep, imgContext);
	playSong(pixelGroups);
}

function playSong(pixelGroups) {
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

	notesData = [];
	
	for (var i = 0; i < pixelGroups.length; i++) {
		var redNote = getPitchInKey(pixelGroups[i].red);
		var greenNote = getPitchInKey(pixelGroups[i].green);
		var blueNote = getPitchInKey(pixelGroups[i].blue);
		var duration = getNoteLength(pixelGroups[i].green);
		var luminosity = 0.2126*pixelGroups[i].red + 0.7152*pixelGroups[i].green + 0.0722*pixelGroups[i].blue;

		notesData.push({
			redNote: redNote,
			greenNote: greenNote,
			blueNote: blueNote,
			duration: duration,
			lum: luminosity
		});
	}

	for (var i = 0; i < notesData.length; i++) {
		console.log("redNote: " + notesData[i].redNote);
		console.log("greenNote: " + notesData[i].greenNote);
		console.log("blueNote: " + notesData[i].blueNote);
		//console.log("duration: " + notesData[i].duration);
		console.log("");
	}			

	MIDI.loadPlugin({
	    soundfontUrl: "http://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/",
	    instrument: "acoustic_grand_piano",
	    onsuccess: function() {
	    	playNotes(0, notesData);
	    }
	});
}

function playNotes(i, notesData) {
	if (i < notesData.length) {
		setFilters(notesData[i].lum);

        var delay = 0; 
        var velocity = 127; 
        MIDI.setVolume(0, 127);
        MIDI.noteOn(0, notesData[i].redNote, velocity, delay);
        MIDI.noteOn(0, notesData[i].greenNote, velocity, delay);
        MIDI.noteOn(0, notesData[i].blueNote, velocity, delay);
        sleep(notesData[i].duration).then(() => {
        	MIDI.noteOff(0, notesData[i].redNote, delay + notesData[i].duration);
        	MIDI.noteOff(0, notesData[i].greenNote, delay + notesData[i].duration);
        	MIDI.noteOff(0, notesData[i].blueNote, delay + notesData[i].duration);
        	playNotes(i+1, notesData);
        });
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
