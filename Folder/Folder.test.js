import React from 'react';
import ReactDOM from 'react-dom';
import Folder from './Folder';
import { BrowserRouter } from 'react-router-dom';

// describe test suite
describe('Folder component', () => {

    // use jest it() to test component
    it('renders without crashing', () => {

        const test = 'test';
        const testId = "testId"
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><Folder folderName={test} folderId={testId}/></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });




});