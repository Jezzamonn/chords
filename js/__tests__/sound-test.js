import { getNoteFromScaleNote } from '../sound'

describe(getNoteFromScaleNote, () => {
    it('should return 0 for middle C', () => {
        expect(getNoteFromScaleNote(0)).toBe(0);
    });

    it('should loop around for an octave', () => {
        // High C
        expect(getNoteFromScaleNote(7)).toBe(12);
    });

    it('should handle a high note in another octave', () => {
        // High G
        expect(getNoteFromScaleNote(10)).toBe(17);
    });
    
    it('should handle negative notes', () => {
        // A
        expect(getNoteFromScaleNote(-2)).toBe(-3);
    });

    it('should handle negative notes in another octave', () => {
        // A but lower
        expect(getNoteFromScaleNote(-9)).toBe(-15);
    });
})
