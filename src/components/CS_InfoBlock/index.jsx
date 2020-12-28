import React from "react"

class CSInfoBlock extends React.Component {
    render() {
        return (
            <div id="information">
                <h1>統計資訊</h1>
                <p>客戶人數  ： {this.props.Sum}</p>
                <p>平均年齡  ： {this.props.Ave}</p>
            </div>
        )
    }
}

export default CSInfoBlock