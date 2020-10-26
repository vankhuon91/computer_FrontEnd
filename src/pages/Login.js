import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';


import {
    Link, Redirect, useHistory,
    useLocation
} from "react-router-dom";
import axios from "axios";
import fakeAuth from '../components/auth'

export default function SignIn() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const { username, password } = inputs;

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {

        fakeAuth.authenticate(async () => {
            let data = await axios.post('https://miavm.bqp:443/api/users/login', { user: username, pass: password });
            data = data.data;
            // console.log(data)
            if (data) {
                history.replace(from)
            }
            else {
                fakeAuth.isAuthenticated = false;
            }
        });
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }
    return (

        <form noValidate
            style={{ width: '40%',marginLeft:'30%',marginTop:'5%'}}
        >
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                value={username}
                onChange={handleChange}

                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={handleChange}

                autoComplete="current-password"
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                //  type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={login}
            >
                Sign In
        </Button>

        </form>

    );
}