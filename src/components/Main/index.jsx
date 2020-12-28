import React from "react"
import { HashRouter } from "react-router-dom"
import TopBlock from "../TopBlock"
import Router from "../Router"

class Main extends React.Component {
    render() {
        return (
            <div id="main">
                <HashRouter>
                    <TopBlock />
                    <Router />
                </HashRouter>
            </div>
        )
    }
}

export default Main