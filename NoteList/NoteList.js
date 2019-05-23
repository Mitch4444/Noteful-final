import React from 'react';
import './NoteList.css';
import AppContext from '../AppContext';
import { Link } from 'react-router-dom';

class NoteList extends React.Component {

    static contextType = AppContext;

    handleClickDelete(noteId) {

        const note = this.context.notes.find(note => note.id === noteId);
        this.context.deleteNote(note);
    }

    render() {

        const notes = this.context.notes.map(note => {
            return (
                <li key={note.id} className="noteListItem">
                    <div>
                        <Link to={`/note/${note.id}`} className="noteListItemPath">
                            <h2>{note.name}</h2>
                        </Link>
                        <p>
                            Modified: {note.modified} <br />
                        </p>
                    </div>
                    <button 
                    onClick={() => this.handleClickDelete(note.id)}
                    className="btn-deleteCompactNote"
                    >Remove</button>
                </li>
            );
        });

        // use nav link
        return (
            <section className="noteList">
                <ul>
                    {notes}
                </ul>
                <div className="btn-addNote">
                    <Link to="/add-note">
                        <button>Add Note</button>
                    </Link>
                </div>
            </section>
        );
    }
}

export default NoteList;