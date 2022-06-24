import React, {FunctionComponent} from 'react';

type Props = {
    note: Array<{
        username: string,
        text: string,
        x: number,
        y: number
    }>,
    isMine: boolean,
    onClick: (number: number) => void,
};

const Note:FunctionComponent = (props: Props) => {
    const {note, isMine,  onClick} = props;
    return (
            <div
                style={{
                    width: '200px',
                    height: '100px',
                    border: '2px solid #000',
                    borderRadius: '4px',
                    backgroundColor: isMine ? 'pink' : 'lightblue',
                    padding: '5px',
                    position: 'absolute',
                    left: note.x,
                    top: note.y,
                }}
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
                    <span onClick={isMine ? onClick : () => {}}>{note.text || 'Click here to add text'}</span>
                </div>
            </div>
    );
};

export default Note;