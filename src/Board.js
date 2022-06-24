import './App.css';
import Note from './Note';
import React, {useState, useEffect, useRef} from 'react';
import Draggable from 'react-draggable';
import io from "socket.io-client";
let socket = io("/");

const Board = () => {
    const [username, setUsername] = useState(null);
    const [notes, setNotes] = useState([]);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [isDragging, setDragging] = useState(false);

    useEffect(() => {
        let name = localStorage.getItem('username');
        if (name) {
            setUsername(name)
        }
        else {
            name = prompt('Please, enter your username');
            setUsername(name);
            localStorage.setItem('username', name);
        }
        const storageNotes = JSON.parse(localStorage.getItem('notes'));
        if (storageNotes) {
            setNotes(storageNotes);
        }
        socket.on('newNotes', msg => {
            saveNotes({notes: msg.notes, emit: false});
        });
        return () => socket.disconnect();
    }, []);

    const onSpaceClick = e => {
        if (isDragging) {
            return;
        }
        const newNotes = [...notes, ...[{
            username: username,
            x: x,
            y: y
        }]];
        saveNotes({notes: newNotes, emit: true});
    };

    const onMouseMove = e => {
        setX(e.pageX);
        setY(e.pageY);
    };

    const onNoteClick = (note, index, e) => {
        e.stopPropagation();
        e.preventDefault();
        if (isDragging) {
            return;
        }
        const text = prompt('Please, enter a new text to the note:');
        const newNotes = notes.map(note => note);
        newNotes[index].text = text;
        saveNotes({notes: newNotes, emit: true});
        return false;
    };

    const saveNotes = ({notes, emit}) => {
        setNotes(notes);
        let storageNotes;
        if (notes.length) {
            storageNotes = JSON.stringify(notes);
        }
        else {
            storageNotes = null;
        }
        localStorage.setItem('notes', storageNotes);
        if (emit) {
            socket.emit('notesChanged', {notes});
        }
    };

    const onDragStart = () => {
        setTimeout(() => {setDragging(true)}, 250);
    };

    const onDragStop = () => {
        setTimeout(() => {setDragging(false)}, 250);
    };

    const onButtonClick = e => {
        saveNotes({notes: [], emit: true});
        e.stopPropagation();
    };

    const noteRef = useRef();


    return (
        <div
            style={{width: '100%', height: window.innerHeight}}
            onClick={onSpaceClick}
            onMouseMove={onMouseMove}
        >
            <h1>{`Hello, ${username}!`}</h1>
            {!!notes.length && notes.map((note, index) => (
                <Draggable
                    onStart={onDragStart}
                    onStop={onDragStop}
                    disabled={note.username !== username}
                >
                    <div>
                        <Note
                            ref={noteRef}
                            note={note}
                            index={index}
                            onClick={e => onNoteClick(note, index, e)}
                            username={username}
                        />
                    </div>
                </Draggable>
            ))}
            {!!notes.length && <button onClick={onButtonClick}>Remove all notes</button>}
        </div>
    );

};

export default Board;