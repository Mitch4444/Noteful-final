import React from 'react';
import ReactDOM from 'react-dom';
import ValidationError from './ValidationError';

// describe test suite
describe('ValidationError component', () => {

    // use jest it() to test component 
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ValidationError />, div);
        ReactDOM.unmountComponentAtNode(div);
    });



    
});