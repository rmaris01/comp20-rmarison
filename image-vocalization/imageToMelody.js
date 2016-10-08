
var oscillator;
var midi = null;  // global MIDIAccess object
var midiData = null;

function onMIDIMessage (message) {
	midiData = message.data;
	console.log("MIDI data", midiData);
}

function onMIDISuccess( midiAccess ) {
	console.log( "MIDI ready!" );
	midi = midiAccess;  // store in the global (in real usage, would probably keep in an object instance)
	console.log(midi);
	var inputs = midi.inputs.values();
	for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
		console.log('in loop');
		// each time there is a midi message call the onMIDIMessage function
		input.value.onmidimessage = onMIDIMessage;
		var input = input.value;
	    console.log("Input port : [ type:'" + input.type + "' id: '" + input.id +
	        "' manufacturer: '" + input.manufacturer + "' name: '" + input.name +
	        "' version: '" + input.version + "']");	
	}
}

function onMIDIFailure(msg) {
	console.log( "Failed to get MIDI access - " + msg );
}

function getMidi() {
	// navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure );
	if (navigator.requestMIDIAccess) {
	    navigator.requestMIDIAccess({
	        sysex: false
	    }).then(onMIDISuccess, onMIDIFailure);
	} else {
	    alert("No MIDI support in your browser.");
	}
}

// function getImgData() {
// 	img = document.getElementById('user-img');
// 	canvas = document.createElement('canvas');
// 	context = canvas.getContext('2d');
// 	canvas.width = img.width;
// 	canvas.height = img.height;
// 	context.drawImage(img, 0, 0);
// 	var x = width = y = height = 0;

// 	//set x, y, width, and height here based on what sweeping pattern is used
// 	//left to right:
// 	width = 5;
// 	height = img.height;

// 	//get averages for each chunk of pixels, and store in array
// 	while (x < img.width) {
// 		var imageData = context.getImageData(x, y, width, height);
// 		var pixelData = imageData.data;
// 		var numPixels = pixelData.length / 4;
// 		var redSum = greenSum = blueSum = alphaSum = 0;
// 		var redAverage = greenAverage = blueAverage = alphaAverage = 0;

// 		for (i = 0; i < pixelData.length; i++) {
// 			if (i % 4 == 0) { //red
// 				redSum += pixelData[i];
// 			} else if (i % 4 == 1) { //green
// 				greenSum += pixelData[i];
// 			} else if (i % 4 == 2) { //blue
// 				blueSum += pixelData[i];
// 			} else if (i % 4 == 3) { //alpha
// 				alphaSum += pixelData[i];
// 			}
// 		}
// 		redAverage = redSum / numPixels;
// 		greenAverage = greenSum / numPixels;
// 		blueAverage = blueSum / numPixels;
// 		alphaAverage = alphaSum / numPixels;

// 		pixelGroups.push({
// 			red: redAverage,
// 			green: greenAverage,
// 			blue: blueAverage,
// 			alpha: alphaAverage
// 		});

// 		//set new x, y, width, and height here. This will also differ depending
// 		//on the sweeping pattern
// 		x += width;
// 	}
// }

// function playNote (frequency, noteLength) {
// 	//start playing the note
//     oscillator = context.createOscillator();
//     oscillator.frequency.value = frequency;
//     oscillator.connect(context.destination);
//     oscillator.start(context.currentTime);

//     //stop playing the note after some length of time
//     oscillator.stop(context.currentTime + noteLength);
//     //oscillator.disconnect();
// }

// function stopNote (frequency) {
//     oscillators[frequency].stop(context.currentTime);
//     oscillators[frequency].disconnect();
// }

// function play() {
// 	// var frequency = Math.floor(redAverage % 88) + 21;
// 	// console.log(redAverage);
// 	// var noteLength = getNoteLength(greenAverage);
// 	//playNote(redAverage, noteLength);
// 		//stopNote(redAverage);

// 		// plays notes in the midi note range 21 - 108 (inclusive)
// 		Soundfont.instrument(context, 'acoustic_grand_piano').then(function (piano) {
// 			piano.play(60, context.currentTime, { duration: 0.5})
// 	});
// }

// function getNoteLength(greenAverage) {
// 	return (greenAverage % 5) + 1;
// }

// function stop() {
// 	console.log(redAverage);
// 	stopNote(redAverage);
// }