import React from "react"

class FSInfoBlock extends React.Component {
    render() {
        return (
            <div id="information">
                <h1>統計資訊</h1>
                <p>總數量  ：{this.props.Sum}</p>
                <p>總金額  ： {this.props.Money}</p>
            </div>
        )
    }
}

export default FSInfoBlock