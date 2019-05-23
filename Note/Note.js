import React, { Component } from 'react';
import './Note.css';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';

export default class Note extends Component {

    static contextType = AppContext;

    handleClickDelete() {

        const noteId = this.props.match.params.noteId;
        const note = this.context.notes.find(note => note.id === noteId);
        
        this.props.history.push("/");
        this.context.deleteNote(note);
    }

    render() {
        const noteId = this.props.match.params.noteId;
        const note = this.context.notes.find(note => note.id === noteId);
        const folder = this.context.folders.find(folder => folder.id === note.folderId);
        
        return (
            <section className="noteAlign">
                <button 
                className="btn-noteBack"
                onClick={() => this.props.history.push("/")}>Back</button>
                <div className="noteContainer">
                <Link to={`/note/${note.id}`} className="noteLink">
                    <h2>{note.name}</h2>
                </Link>
                <br />
                Modified: {note.modified}
                <br />
                Folder: {folder.name}
                <br />
                <div className="contentContainer">
                    <p className="noteContent">{note.content}</p>
                </div>
                <button 
                className="btn-noteDelete"
                onClick={() => this.handleClickDelete()}>Remove</button>
                </div>
            </section>
        );
    }
}
