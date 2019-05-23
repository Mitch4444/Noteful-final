import React from 'react';
import './App.css';
import AddFolderForm from './AddFolderForm/AddFolderForm';
import AppContext from './AppContext';
import { Route, Link } from 'react-router-dom';
import Note from './Note/Note';
import AddNoteForm from './AddNoteForm/AddNoteForm';
import MainList from './MainList/MainList';
import FolderNav from './FolderNav/FolderNav';
import RouteListError from './RouteListError/RouteListError';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      folders: [],
      notes: [],
      folderToAdd: {}
    }
  }

  componentDidMount() {

    const options = {
      headers: {
        'content-type': 'application/json'
      }
    };

    // Api folders && notes request
    // use Promise all(array) since we want to receive both data sets at the same time 
    Promise.all([
      fetch('http://localhost:9090/folders', options),
      fetch('http://localhost:9090/notes', options)
    ])
    .then(([folders, notes]) => {
      // if either data set === false
      // data retrieval failed due to reject() call
      if(!folders.ok) {
        return folders.json().then(e => Promise.reject(e));
      }

      if(!notes.ok) {
        return notes.json().then(e => Promise.reject(e));
      }

      // if both data sets === true
      // convert data sets to js objects and return once both converted
      return Promise.all([
        folders.json(),
        notes.json()
      ]);
    })
    .then(([foldersJson, notesJson]) => {
      // set states to respective data sets
      this.setState({
        folders: foldersJson,
        notes: notesJson
      });

    })
    .catch(error => {
      console.log(error);
    })

  }

  addFolder = (newFolder) => {
    const newFolders = [...this.state.folders, newFolder]
    this.setState({
      folders: newFolders
    });
  }

  deleteNote = (note) => {

    const newNoteList = this.state.notes.filter(nt => nt.id !== note.id);
    this.setState({
      notes: newNoteList
    });
  }

  addNote = (newNote) => {
    const newNoteList = [...this.state.notes, newNote];
    this.setState({
      notes: newNoteList
    });
  }

  renderAltRoutes() {

    const paths = ["/add-folder", "/add-note"];

    return paths.map((path, index) => {  
      
      if (path === "/add-folder") {
        return <Route key={index} path={path} component={AddFolderForm}/>
      }

      if (path === "/add-note") {
        return <Route key={index} path={path} component={AddNoteForm}/>
      }
    });
  }

  renderMainRoutes() {

    const paths = ["/","/folder/:folderId", "/note/:noteId"];

    return paths.map((path, index) => {

      if (path === "/") {
        return <Route key={index} exact path={path} component={MainList}/>
      }

      if (path === "/folder/:folderId") {
        return <Route key={index} path={path} render={routeProps => {
          const folderId = routeProps.match.params.folderId;

          const selectedNotes = this.state.notes.filter(note => note.folderId === folderId);

          return <FolderNav notes={selectedNotes}/>;
        }}/>
      }     

      if (path === "/note/:noteId") {
        return <Route key={index} path={path} component={Note}/>
      }
    });
  }



  render() {

    // declare context value used with context.Provider
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addFolder: this.addFolder,
      deleteNote: this.deleteNote,
      addNote: this.addNote
    };

    return (
      <div>
        <header>
            <Link to="/" className="headerLink">
              <h1 >Noteful</h1>
            </Link>
        </header>
        <main>
          <RouteListError>
            <AppContext.Provider value={contextValue}>
            <section className="main">
              {this.renderMainRoutes()}
              {this.renderAltRoutes()}
            </section>
            </AppContext.Provider>
          </RouteListError>
        </main>
      </div>
    );
  }
}

export default App;