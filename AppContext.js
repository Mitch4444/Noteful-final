import React from 'react';

// declare a context variable that creates the context
// the js object context has default values
const AppContext = React.createContext({
    folders: [],
    notes: [],
    addFolder: () => {},
    addNote: () => {},
    deleteFolder: () => {},
    deleteNote: () => {}

});

export default AppContext;