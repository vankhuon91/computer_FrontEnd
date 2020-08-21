import React from 'react'
import MiniDrawer from '../components/MyDraw'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Computers from '../components/Computers'
import GroupComputers from '../components/GroupComputers'
import Commands from '../components/Commands'
import Actions from '../components/Actions'

export default function Home() {
    return (
        <div>
             <Router>
                <MiniDrawer>
               
                    <Route exact path="/">
                        <p>Home</p>
                    </Route>
                    <Route exact path="/computers">
                        <Computers/>
                    </Route>
                    <Route path="/commands">
                        <Commands/>
                    </Route>
                    <Route path="/actions">
                        <Actions/>
                    </Route>
                    <Route path="/groupcomputers">
                        <GroupComputers/>
                    </Route>
                    
                </MiniDrawer>
                </Router>
           
        </div>
    )
}
