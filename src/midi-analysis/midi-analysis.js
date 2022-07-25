import { MidiMessage, MessageTypes } from 'midi-message-parser';


export function updatePlayedNotes( rawMessage, played ) {
    /*
    Does....
    Input:
    Return:
    Notes:
        Doesn't handle pedal press events
    */

    const data = Array.from(rawMessage.data); // 'midi-message-parser' doesn't work with Uint8Array

    /*
        Silly workaround:
            Problem:
                'midi-message-parser' sets velocity to 0 on note-off signal
            Solution:
                parse it as a note-on signal, then flip the message type to note off after

     */
    const isNoteOff = (data[0] == 128);       // 128 == note-off
    data[0] = isNoteOff ? 144 : data[0];    // 144 == note-on
    const message = new MidiMessage(data, rawMessage.timeStamp);
    message.type = isNoteOff ? MessageTypes.NOTE_OFF : message.type;

    if ( message.type == MessageTypes.NOTE_ON ) {
        const newNote = {
            "note":         getAbsoluteNote(message.number),
            "startTime":    message.timestamp,
            "endTime":      null,
            "velocityOn":   message.value,
            "velocityOff":  null
        };
        played.push(newNote);
    } else if ( message.type == MessageTypes.NOTE_OFF ) {
        const absNote = getAbsoluteNote(message.number);
        for (let i = played.length-1; i >= 0; i-- ) { // Find corresponding note to update note off data
            if ( played[i].note == absNote && played[i].endTime == null ) {
                played[i].endTime = message.timestamp;
                played[i].velocityOff = message.value;
            }
        }
    } else {
        // Pedals etc.
        console.log( "Unhandled message type" );
    }
    
    return played;
}


export function updateExerciseAnalysisData( exerciseAnalysisData, played ) {
    /*
    Does....
    Input:
    Return:
    */

    // TODO finish this funciton
    // * Doesn't work if notes aren't stacato, 


    let data = exerciseAnalysisData
    let noteData = played.at(-1)

    if ( noteData.endTime == null ) { // => NoteOn
        if ( played.length > 1 ) { // => => Can update interval
            let previousNoteData = played.at(-2)
            let interval = noteData.startTime - previousNoteData.endTime
            data = {
                "velocityOn":   [...data.velocityOn,  {"note": noteData.note, "value": noteData.velocityOn} ],
                "velocityOff":  [...data.velocityOff],
                "intervals":    [...data.intervals,   {"note": previousNoteData.note, "value": interval}],
                "durations":    [...data.durations],
            }
        } else { // simply update velocityOn as first note
            data = {
                "velocityOn":   [...data.velocityOn,  {"note": noteData.note, "value": noteData.velocityOn} ],
                "velocityOff":  [...data.velocityOff],
                "intervals":    [...data.intervals],
                "durations":    [...data.durations],
            }
        }
    } else { // => NoteOff => Can update duration
        let duration = noteData.endTime - noteData.startTime
        data = {
            "velocityOn":   [...data.velocityOn],
            "velocityOff":  [...data.velocityOff, {"note": noteData.note, "value": noteData.velocityOff} ],
            "intervals":    [...data.intervals],
            "durations":    [...data.durations,   {"note": noteData.note, "value": duration} ],
        }
    }
    
    return data
}

export function extractExerciseAnalysisData( played ) {

    let notes =         played.map(function (e) { return e.note })
    let velocityOn =    played.map(function (e) { return e.velocityOn })
    let velocityOff =   played.map(function (e) { return e.velocityOff })
    let startTimes =    played.map(function (e) { return e.startTime })
    let endTimes =      played.map(function (e) { return e.endTime })
    let intervals =     endTimes.slice(1).map((v,i) => v - startTimes.slice(0,-1)[i])
    let durations =     endTimes.map((v, i) => v - startTimes[i])
    
    let data = {
        "velocityOn":   notes.map(function(e, i) { return {"note": e, "value": velocityOn[i]} }),
        "velocityOff":  notes.map(function(e, i) { return {"note": e, "value": velocityOff[i]} }),
        "intervals":    notes.map(function(e, i) { return {"note": e, "value": intervals[i]} }),
        "durations":    notes.slice(0,-1).map(function(e, i) { return {"note": e, "value": durations[i]} }),
    }

    console.log(data)

    return data
}



function getAbsoluteNote( number ) {
    const absoluteNotes = ["A0","A#0","B0",
                "C1","C#1","D1","D#1","E1","F1","F#1","G1","G#1","A1","A#1","B1",
                "C2","C#2","D2","D#2","E2","F2","F#2","G2","G#2","A2","A#2","B2",
                "C3","C#3","D3","D#3","E3","F3","F#3","G3","G#3","A3","A#3","B3",
                "C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4",
                "C5","C#5","D5","D#5","E5","F5","F#5","G5","G#5","A5","A#5","B5",
                "C6","C#6","D6","D#6","E6","F6","F#6","G6","G#6","A6","A#6","B6",
                "C7","C#7","D7","D#7","E7","F7","F#7","G7","G#7","A7","A#7","B7",
                "C8"];
    return absoluteNotes[number];
}

function getRelativeNote( number ) {
    const relativeNotes = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"]
    let index = (number-21) % 12;
    return relativeNotes[index];
}
