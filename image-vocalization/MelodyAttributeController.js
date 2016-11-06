/* These arrays contain the required mod results to be in the specified major key.
   For example, if the note % 12 == 0, then it's the note C. 
   If the note % 12 == 1, then it's the note C#/Db */
   
// [C, D, E, F, G, A, B]
var keyOfC = [0, 2, 4, 5, 7, 9, 11];

// [G, A, B, C, D, E, F#]
var keyOfG = [7, 9, 11, 0, 2, 4, 6];

// [D, E, F#, G, A, B, C#]
var keyOfD = [2, 4, 6, 7, 9, 11, 1];

// [A, B, C#, D, E, F#, G#]
var keyOfA = [9, 11, 1, 2, 4, 6, 8];

function getPitchInKey(rgbVal, key) {
	//plays notes in the midi note range 21 - 108 (inclusive)
	var note = Math.floor((rgbVal / 2.93) + 21); // 255 split into 87 groups is 2.93 per group
    //before was rgbVal % 88 + 21
	var scaleDegree = note % 12;
	var keyArray = window[key];
    note = getNoteInSpecifiedKey(keyArray, scaleDegree, note);
	return note;
}

function getNoteInSpecifiedKey(keyArray, scaleDegree, note) {
    for (var i = 0; i < keyArray.length; i++) {
    	if (scaleDegree == keyArray[i]) {  // it's in the key, so it's all good
    		return note;
    	}
    }
    // it's not, so add 1 and try again
    return getNoteInSpecifiedKey(keyArray, scaleDegree + 1, note + 1);
}

function getNoteLength(notesData, pixelGroups, i) {
    var delta;
    var currentLum = 0.2126*pixelGroups[i].red + 0.7152*pixelGroups[i].green + 0.0722*pixelGroups[i].blue;
    if (notesData.length == 0) {
        delta = currentLum;
    } else {
        var prevLum = notesData[i - 1].lum;
        delta = Math.abs(prevLum - currentLum);  //delta will be in the range of 0 to 255
    }
    //console.log("delta: " + ((255 - delta) / 212.5) * 1000)
    //return (delta % 1.2) * 1000;
    return ((255 - delta) / 212.5) * 1000; // 255 split into 1.2 groups is 212.5 per group
}

function setFilters(lum) {
    excursion = lum / 42.5; // highest lum is 255, and 255 split into 6 groups is 42.5 per group
    //baseFreq = (255 - lum) / 255; // split 255 into two groups
    intensity = lum / 127.5; // highest lum is 255, and 255 split into 2 groups is 127.5 per group
    rate = lum / 31.875 // highest lum is 255, and 255 split into 8 groups is 31.875 per group

    MIDI.setEffects([
        // {
        //     type: "Tremolo",
        //     intensity: intensity, // 0 to 1
        //     rate: rate, // 0.001 to 8
        //     stereoPhase: 0, // 0 to 180
        //     bypass: 0
        // },
        {
            type: "WahWah",
            automode: true, // true/false
            baseFrequency: 0, // 0 to 1
            excursionOctaves: excursion, // 1 to 6
            sweep: 0, // 0 to 1
            resonance: 1, // 1 to 100
            sensitivity: 0, // -1 to 1
            bypass: 0
        }
            // type: "Filter",
      //       frequency: 2500, // 20 to 22050
      //       Q: 1, // 0.001 to 100
      //       gain: 0, // -40 to 40
      //       bypass: 0, // 0 to 1+
      //       filterType: "highpass" // 0 to 7, corresponds to the filter types in the native filter node: lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass in that order
    ]);
}