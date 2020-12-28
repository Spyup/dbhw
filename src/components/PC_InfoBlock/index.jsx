import React from "react"

class PCInfoBlock extends React.Component {
    render() {
        return (
            <div id="information">
                <h1>統計資訊</h1>
                <p>數量   ：{this.props.Sum}</p>
                <p>未交貨金額   ：{this.props.Before_Money}</p>
                <p>已交貨金額   ：{this.props.After_Money}</p>
            </div>
        )
    }
}

export default PCInfoBlock