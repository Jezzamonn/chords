/**
 * 
 * @param {AudioContext} audioContext 
 * @param {Number} note 
 */
export function playNote(audioContext, noteIndex, {decay=1, delay=0}) {
    setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const frequency = getNoteFrequency(noteIndex);
        oscillator.frequency.value = frequency;
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + decay);
    
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        // Don't play forever
        oscillator.stop(audioContext.currentTime + decay);
    }, 1000 * delay);
}

/**
 * 
 * @param {Number} index Index compared to middle C
 */
function getNoteFrequency(index) {
    return 440 * Math.pow(2, (index + 3) / 12);
}