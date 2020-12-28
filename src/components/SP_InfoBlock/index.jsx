import React from "react"

class SPInfoBlock extends React.Component {
    render() {
        return (
            <div id="information">
                <h1>統計資訊</h1>
                <p>共{this.props.Sum}家供應商</p>
                <p>&emsp;{this.props.Email}家供應商的Email相同</p>
                <p>&emsp;{this.props.Principal}家供應商的負責人相同</p>
            </div>
        )
    }
}

export default SPInfoBlock