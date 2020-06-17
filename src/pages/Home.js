import React from 'react'
import MiniDrawer from '../components/MyDraw'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Users from '../components/Users'
import Books from '../components/Books'
import Transactions from '../components/Transactions'

export default function Home() {
    return (
        <div>
             <Router>
                <MiniDrawer>
               
                    <Route exact path="/">
                        <p>Home</p>
                    </Route>
                    <Route exact path="/Users">
                        <Users/>
                    </Route>
                    <Route path="/Books">
                        <Books/>
                    </Route>
                    <Route path="/Transactions">
                        <Transactions/>
                    </Route>
                    
                </MiniDrawer>
                </Router>
           
        </div>
    )
}
