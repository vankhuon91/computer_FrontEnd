import React from 'react'
import MiniDrawer from '../components/MyDraw'
import './Home.css'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";

import Computers from '../components/Computers'
import GroupComputers from '../components/GroupComputers'
import Commands from '../components/Commands'
import Actions from '../components/Actions'

export default function Home() {
    let { path, url } = useRouteMatch();
    return (
        <div className='Container'>

            <MiniDrawer >
                <Switch>
                    <Route exact path="/">
                        <Actions />
                    </Route>
                    <Route exact path="/actions">
                        <Actions />
                    </Route>
                    <Route exact path="/computers">
                        <Computers />
                    </Route>
                    <Route exact path="/commands">
                        <Commands />
                    </Route>
                    <Route exact path="/groupcomputers">
                        <GroupComputers />
                    </Route>
                </Switch>
            </MiniDrawer>
        </div>
    )
}
