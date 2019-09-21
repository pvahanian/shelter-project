import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Select from '../components/Select';


class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newUser: {
                gender: '',
                zip: '',
                city: '',
                age: '',
            },
            genderOptions: ["Male", "Female", "Transgender Male", "Transgender Female"]
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let userData = this.state.newUser;
        /*API call made here*/
        console.log(userData);

    }

    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            newUser: {
                gender: '',
                zip: '',
                city: '',
                age: '',
            }
        });
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
            prevState => ({
                newUser: {
                    ...prevState.newUser,
                    [name]: value
                }
            }),
            () => console.log(this.state.newUser)  
        );
    }

    render() {
        return(
            <form className="container" onSubmit={this.handleFormSubmit}>
                {/*Age*/}
                <Input 
                    inputType = {"number"}
                    title = {"Age"}
                    name = {"age"}
                    value = {this.state.newUser.age}
                    placeholder = {"Enter your age"}
                    handleChange={this.handleInput}
                    /> 
                {/*City*/}
                <Input 
                    inputType = {"text"}
                    title = {"City"}
                    name = {"city"}
                    value = {this.state.newUser.city}
                    placeholder = {"Enter a city"}
                    handleChange = {this.handleInput}
                    /> 
                {/*ZIP*/}
                <Input 
                    inputType = {"text"}
                    title = {"ZIP"}
                    name = {"ZIP"}
                    value = {this.state.newUser.ZIP}
                    placeholder = {"Enter your ZIP code"}
                    handleChange = {this.handleInput}
                /> 
                {/*Gender*/}
                <Select
                    title = {"Gender"}
                    name = {"gender"}
                    options = {this.state.genderOptions}
                    value = {this.state.newUser.gender}
                    placeholder = {"Select a gender"}
                    handleChange = {this.handleInput}
                /> 
                {/*Submit*/}
                <Button 
                    action = {this.handleFormSubmit}
                    type = {"primary"}
                    title = {"Search"}
                    
                /> 
                {/*Clear Form*/}
                <Button 
                    action = {this.handleClearForm}
                    type = {"secondary"}
                    title = {"Clear"}
                    
                    /> 
            </form>
        )
    }
}
export default SearchForm;