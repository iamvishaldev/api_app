import React from 'react'
import AllUsers from './Components/AllUsers'
import CreateContact from './Components/CreateContact'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <AllUsers />
                    </Route>
                    <Route exact path="/create">
                        <CreateContact />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;