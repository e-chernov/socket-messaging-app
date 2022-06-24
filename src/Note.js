import React, {forwardRef} from 'react';

const Note = forwardRef((props, ref) => {
    const {note, username,  onClick} = props;
    return (
            <div
                style={{
                    width: '200px',
                    height: '100px',
                    border: '2px solid #000',
                    borderRadius: '4px',
                    backgroundColor: note.username === username ? 'pink' : 'lightblue',
                    padding: '5px',
                    position: 'absolute',
                    left: note.x,
                    top: note.y - 90,
                }}
                ref={ref}
            >
                <div style={{fontWeight: 'bold'}}>{`made by ${note.username}`}</div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '80px'
                    }}
                >
                    <span onClick={onClick}>{note.text || 'Click here to add text'}</span>
                </div>
            </div>
    );
});

export default Note;