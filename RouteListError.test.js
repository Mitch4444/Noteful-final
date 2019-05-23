import React from 'react';
import ReactDOM from 'react-dom';
import RouteListError from './RouteListError';

// use describe() to create test suite
describe('RouteListError component', () => {

    // use jest it() to test component
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RouteListError><div>Test</div></RouteListError>, div);
        ReactDOM.unmountComponentAtNode(div);
    });




});