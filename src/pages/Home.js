import React from 'react'
import MiniDrawer from '../components/MyDraw'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function Home() {
    return (
        <div>
             <Router>
                <MiniDrawer>
               
                    <Route exact path="/">
                        <p>Home</p>
                    </Route>
                    <Route exact path="/Users">
                        <p>users</p>
                    </Route>
                    <Route path="/Books">
                        <p>books</p>
                    </Route>
                    <Route path="/Transactions">
                        <p>transcations</p>
                    </Route>
                    
                </MiniDrawer>
                </Router>
           
        </div>
    )
}
