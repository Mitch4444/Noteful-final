import React, { Component } from 'react';
import './AddFolderForm.css';
import AppContext from '../AppContext';
import ValidationError from '../ValidationError/ValidationError';

class AddFolder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            folder: {
                id: null,
                name: '',
                nameValid: false,
                formValid: null,
                validationMessages: ''
            }
        }
    }

    static contextType = AppContext;

    handleSubmitFolder(event) {
        // console.log('handleSubmitFolder() was called');
        event.preventDefault();
        this.context.addFolder(this.state.folder);
        this.props.history.push('/');
    }

    handleChangeInput(event) {

        const input = event.target.value;  
        const folderIndex = this.context.folders.length.toString();  

        const hasError = this.validateFolderName(input).hasError;
        const inputError = this.validateFolderName(input).inputError;

        this.setState({
            folder: {
                id: folderIndex,
                name: input,
                nameValid: !hasError,
                formValid: !hasError,
                validationMessages: inputError
            }
        });
        
    }

    validateFolderName(inputValue) {
        // make a copy of the validationMessages object
        let inputError = '';
        let hasError = false;

        // get rid of white space
        inputValue = inputValue.trim();
        if (inputValue.length === 0) {
            inputError = "Name is required";
            hasError = true;
        } else {
            if (inputValue.length < 3) {
                inputError = 'Name must be at least 4 characters long';
                hasError = true;
            } else {
                inputError = '';
                hasError = false;
            }
        }

        let validity = {
            hasError: hasError,
            inputError: inputError
        }
        return validity;
    }

    render() {

        return (
            <section className="addFolderContainer">
                <div>
                    <h2 className="addFolderTitle">Create a folder</h2>
                    <div className="folderConAlign">
                        <button 
                            onClick={() => this.props.history.push('/')}>Back</button>
                        <form onSubmit={event => this.handleSubmitFolder(event)}>
                            <label className="inputLabel" htmlFor="name">Name</label>
                            <br />
                            <br />
                            <input 
                            className="inputField"
                            type="text" 
                            id="name" 
                            name="name" 
                            required
                            onChange={event => this.handleChangeInput(event)}
                            />
                            <ValidationError 
                            hasError={!this.state.folder.nameValid}
                            message={this.state.folder.validationMessages}
                            />
                            <br />
                            <button 
                            type="submit"
                            disabled={!this.state.folder.formValid}
                            >Add Folder</button>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

export default AddFolder;