
const C_MAJOR_SCALE = [
    0, 2, 4, 5, 7, 9, 11,
];
const OCTAVE_AMOUNT = 12;

export function playNote({audioContext, note = null, scaleNote = null, decay=2, delay=0, volume=1}) {
    if (note == null && scaleNote == null) {
        throw new Error('Must specify note or scaleNote');
    }
    if (note == null) {
        note = getNoteFromScaleNote(scaleNote);
    }
    const noteFrequency = getNoteFrequency(note);

    setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.value = noteFrequency;
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + decay);
    
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        // Don't play forever
        oscillator.stop(audioContext.currentTime + decay);
    }, 1000 * delay);
}

export function getNoteFromScaleNote(scaleNote) {
    const zeroIndex = (scaleNote - 1);
    const octave = Math.floor(zeroIndex / 8);
    let octaveNote = zeroIndex % 8;
    if (octaveNote < 0) {
        octaveNote += 8;
    }
    return octave * OCTAVE_AMOUNT + C_MAJOR_SCALE[octaveNote];
}

/**
 * 
 * @param {Number} index Index compared to middle C
 */
export function getNoteFrequency(index) {
    return 440 * Math.pow(2, (index + 3) / 12);
}