import React from 'react';
import './FolderNav.css';
import FolderList from '../FolderList/FolderList';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import PropTypes from 'prop-types';

class FolderNav extends React.Component {

    static contextType = AppContext;

    handleClickDelete(noteId) {

        const note = this.context.notes.find(note => note.id === noteId);
        this.context.deleteNote(note);
    }

    renderSelectedNotes() {

        const notes = this.props.notes.map(note => {

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

        return notes;
    }
    
    render() {
        return (
            <section className="selectedFolderList">
                <FolderList />
                <ul>
                    {this.renderSelectedNotes()}
                <div className="btn-addNote">
                    <Link to="/add-note">
                        <button>Add Note</button>
                    </Link>
                </div>
                </ul>
            </section>
        );
    }
}

FolderNav.propTypes = {
    notes: PropTypes.array.isRequired
}

export default FolderNav;