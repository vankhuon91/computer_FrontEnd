import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import { Link, Redirect } from "react-router-dom";



export default function SignIn() {

    return (

        <form noValidate >
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
               
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
                
               
            >
                Sign In
        </Button>
            <Grid container>
                <Grid item xs>
                    <Link to="#" variant="body2"> 
                        Forgot password?
            </Link>
                </Grid>
                <Grid item>
                    <Link to="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </form>

    );
}