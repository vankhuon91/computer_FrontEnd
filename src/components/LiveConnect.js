import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import TextField from '@material-ui/core/TextField';
import './LiveConnect.css';

let socket;

function LiveConnect(props) {
    const [state, setState] = useState({
        windowsCMD:           
            '\n'
        ,
        currDir: "C:\\",
        cmdLine: "",
       
    });

    useEffect(() => {
        socket = socketIOClient('https://127.0.0.1:3000');
        socket.on('resultCMD',(resultCMD)=>{
            setState({windowsCMD:resultCMD})
        })
        
    }, [])

    
    const keyPress=(e)=>{
        if(e.keyCode == 13){
            setState({ cmdLine:  e.target.value})
            socket.emit('CMD',e.target.value)
            // put the login here
         }
    }
    return (
        <div className='Container'>
            <p>Live connect from here</p>
            
            <TextField className='textinput'
                
                label="CommandLine cmd.exe"
                multiline
                rows={25}
                value={state.windowsCMD}
                defaultValue="C:\"
                variant="outlined"
            />
            <TextField  className='textinput'
             label="CMD" 
             defaultValue="dir"
             
             onKeyDown={keyPress}
              />

        </div>
    );
}

export default LiveConnect;