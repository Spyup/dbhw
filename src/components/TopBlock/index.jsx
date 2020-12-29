import React from "react"
import { Route, Link } from "react-router-dom"
import TopSearch from "../TopSearch"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"

class BookMark extends React.Component {
    render() {
        return (
            < Route exact path={this.props.to}
                children={props => {
                    let Name = "BookMark"
                    props.match ? Name += " select_BookMark" : Name = "BookMark"
                    return (
                        <Link to={this.props.to}>
                            <Button variant="link" className={Name}>{this.props.name}</Button>
                        </Link>
                    )
                }
                } />
        )
    }
}

class TopBlock extends React.Component {
    render() {
        return (
            <Container fluid id="topblock">
                <Row>
                    <Col>
                        <Navbar bg="light" variant="light">
                            <Navbar.Brand to="/">東海園藝公司</Navbar.Brand>
                            <Nav className="mr-auto">
                                <BookMark to="/" name="花草苗木資料表" />
                                <BookMark to="/customer" name="客戶資料表" />
                                <BookMark to="/household" name="靜止戶資料表" />
                                <BookMark to="/supplier" name="供應商資料表" />
                                <BookMark to="/purchase" name="客戶購買資料表" />
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default TopBlock