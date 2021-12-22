import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router-dom';
const axios = require('axios');

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    onInputChange({ target: { value, name } }) {
        console.log(',name ', name);
        switch (name) {
            case 'username': {
                this.setState({ username: value });
                break;
            }

            case 'password': {
                this.setState({ password: value });
                break;
            }

            default: {
                console.log(`invalid name for login field: ${value}`);
            }
        }
    }

    onSubmit() {
        const {
            username,
            password
        } = this.state;
        const {
            showLogin
        } = this.props;
        console.log('username username ', username);
        console.log('password password ', password);
        const user = { username, password }
        axios.post('http://localhost:5000/users/add', user).then(()=>{
                showLogin();
        })
    }

    render() {
        const {
            username,
            password
        } = this.state;
        const {
            showLogin
        } = this.props;
        return (
            <div id="col-1">
                <h1>SignUp</h1>
                <TextField
                    name='username'
                    id="outlined-textarea"
                    label="Username"
                    placeholder="username"
                    multiline
                    className="username"
                    defaultValue={username}
                    onChange={this.onInputChange}
                />
                <TextField
                    name='password'
                    id="outlined-textarea"
                    label="Password"
                    type="password"
                    placeholder="password"
                  
                    className="password"
                    defaultValue={password}
                    onChange={this.onInputChange}

                />
                <TextField
                    name='password'
                    id="outlined-textarea"
                    label="Repeat Password"
                    placeholder="password"
                    type="password"
                    className="password"
                    defaultValue={password}
                    onChange={this.onInputChange}
                />
                <Button className="button" variant="contained" onClick={this.onSubmit} >SignUp</Button>
                <p>Already signed up ? <a href="#" onClick={showLogin}>Login</a> now</p>
            </div>
        );
    }
}

export default withRouter(SignUp);
