import React from "react"
import { Route } from "react-router-dom"
import FlowerSeedling from "../../Page/FlowerSeedling"
import Customer from "../../Page/Customer"
import Household from "../../Page/Household"
import Supplier from "../../Page/Supplier"
import Purchase from "../../Page/Purchase"


class Router extends React.Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={FlowerSeedling} />
                <Route exact path="/customer" component={Customer} />
                <Route exact path="/household" component={Household} />
                <Route exact path="/supplier" component={Supplier} />
                <Route exact path="/purchase" component={Purchase} />
            </div>
        )
    }
}

export default Router