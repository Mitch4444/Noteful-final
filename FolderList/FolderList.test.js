import React from 'react';
import ReactDOM from 'react-dom';
import FolderList from './FolderList';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';


// describe test suite
describe("FolderList component", () => {

    // use jest it() to test component
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><FolderList /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    // enzyme snapshot tests

    // enzyme not compatible with context
    it.skip('renders a list of folders by default', () => {

        // declare a wrapper variable that is a shallow copy of the component 
        const wrapper = shallow(<FolderList />);
        // convert wrapper to json copy
        const wrapperJson = toJson(wrapper);
        // compare rendered to expected snapshot
        expect(wrapperJson).toMatchSnapshot();
    });



    
});