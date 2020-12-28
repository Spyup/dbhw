import React from "react"
import CSInfoBlock from "../../components/CS_InfoBlock"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Form from "react-bootstrap/Form"
import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

let isComposition = false;
const isChrome = navigator.userAgent.indexOf('Chrome') > -1;
let input_ID = "", input_name = "";

class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { customer: [], CheckState: [], show: false, ModalID: "", ModalTitle: "", ID: "", Name: "", CID: "", CName: "", CBirth: "", CPhone: "", CEmail: "", CAge: "", CDiscount: "", ReadOnly: false };
        this.handleInputeChange = this.handleInputeChange.bind(this);
        this.handleComposition = this.handleComposition.bind(this);
        this.SearchSpecific = this.SearchSpecific.bind(this);
        this.initState = this.initState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.UpdateModal = this.UpdateModal.bind(this);
        this.ChangeChecked = this.ChangeChecked.bind(this);
    }

    handleComposition(event) {
        if (event.type === 'compositionend') {
            isComposition = false;
            if (!isComposition && isChrome) {
                this.handleInputeChange(event);
            }
        }
        else {
            isComposition = true;
        }
    }

    handleInputeChange = event => {
        if (!isComposition) {
            const target = event.target;
            if (target.id === "input-ID") {
                input_ID = target.value;
            }
            if (target.id === "input-name") {
                input_name = target.value;
            }
            this.setState({ ID: input_ID, Name: input_name }, () => {
                this.SearchSpecific();
            });
        }
    }

    SearchSpecific() {
        const url = "/api/customer/Search/?id=" + this.state.ID + "&name=" + this.state.Name;
        fetch(url)
            .then(function (res) {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(function (res) {
                if (res.sucess === 0) {
                    throw new Error("查無結果");
                }
                return res;
            })
            .then(data => this.setState({ customer: data.data }))
            .catch(function (error) {
                if (error.message === "查無結果") {
                    alert(error.message);
                }
                else {
                    console.log(error);
                    alert("error");
                }
            }, () => this.initState());
    }


    initState() {
        this.setState({ customer: [] });
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("id", event.target.inputID.value);
        formData.append("name", event.target.inputName.value);
        formData.append("birth", event.target.inputBirth.value);
        formData.append("phone", event.target.inputPhone.value);
        formData.append("email", event.target.inputEmail.value);
        formData.append("age", event.target.inputAge.value);
        formData.append("file", event.target.inputPhoto.files[0]);
        formData.append("discount", event.target.inputDiscount.value);
        if (this.state.ModalID === "insert") {
            fetch("/api/customer/", {
                method: "POST",
                body: formData
            })
                .then(function (res) {
                    if (!res.ok) {
                        throw new Error(res.statusText);
                    }
                    return res.json();
                })
                .then(function (res) {
                    if (res.sucess === 0) {
                        throw new Error("查無結果");
                    }
                    return res;
                })
                .then(() => this.setState({ show: false }))
                .catch(function (error) {
                    if (error.message === "查無結果") {
                        alert(error.message);
                    }
                    else {
                        console.log(error);
                        alert("error");
                    }
                });
            fetch("/api/customer")
                .then(res => res.json())
                .then(data => this.setState({ customer: data.data }));
        }
        else if (this.state.ModalID === "update") {
            fetch("/api/customer/", {
                method: "PUT",
                body: formData,
            })
                .then(function (res) {
                    if (!res.ok) {
                        throw new Error(res.statusText);
                    }
                    return res.json();
                })
                .then(function (res) {
                    if (res.sucess === 0) {
                        throw new Error("查無結果");
                    }
                    return res;
                })
                .then(() => this.setState({ show: false }))
                .catch(function (error) {
                    if (error.message === "查無結果") {
                        alert(error.message);
                    }
                    else {
                        console.log(error);
                        alert("error");
                    }
                });
            fetch("/api/customer")
                .then(res => res.json())
                .then(data => this.setState({ customer: data.data }));
        }
        else if (this.state.ModalID === "delete") {
            fetch("/api/customer/", {
                method: "delete",
                body: formData
            })
                .then(function (res) {
                    if (!res.ok) {
                        throw new Error(res.statusText);
                    }
                    return res.json();
                })
                .then(function (res) {
                    if (res.sucess === 0) {
                        throw new Error("查無結果");
                    }
                    return res;
                })
                .then(() => this.setState({ show: false }))
                .catch(function (error) {
                    if (error.message === "查無結果") {
                        alert(error.message);
                    }
                    else {
                        console.log(error);
                        alert("error");
                    }
                });
            fetch("/api/customer")
                .then(res => res.json())
                .then(data => this.setState({ customer: data.data }));
        }


        this.setState({
            ModalID: "",
            CID: "",
            CName: "",
            CBirth: "",
            CPhone: "",
            CEmail: "",
            CAge: "",
            CDiscount: "",
            ReadOnly: false,
            CheckState: [],
        })

    }

    UpdateModal(event) {
        if (event.target.id === "insert") {
            this.setState({
                ModalID: "insert",
                CID: "",
                CName: "",
                CBirth: "",
                CPhone: "",
                CEmail: "",
                CAge: "",
                CDiscount: "",
                ReadOnly: false
            })
            this.setState({ ModalTitle: "新增客戶資料", show: true });
        }
        else if (event.target.id === "update") {
            if (this.state.CheckState.length === 0) {
                alert("請句選");
                this.setState({
                    ModalID: "update",
                    CID: "",
                    CName: "",
                    CBirth: "",
                    CPhone: "",
                    CEmail: "",
                    CAge: "",
                    CDiscount: "",
                    ReadOnly: false
                })
            }
            else if (this.state.CheckState.length > 1) {
                alert("請勿句選超過一項");
                this.setState({
                    ModalID: "update",
                    CID: "",
                    CName: "",
                    CBirth: "",
                    CPhone: "",
                    CEmail: "",
                    CAge: "",
                    CDiscount: "",
                    ReadOnly: false
                })
            }
            else {
                this.setState({ ModalTitle: "修改客戶資料", show: true });
                this.state.customer.map((item, index) => item.CID === this.state.CheckState[0] ? this.setState({
                    ModalID: "update",
                    CID: item.CID,
                    CName: item.CName,
                    CBirth: item.CBirth,
                    CPhone: item.CPhone,
                    CEmail: item.CEmail,
                    CAge: item.CAge,
                    CPhoto: "",
                    CDiscount: item.CDiscount,
                    ReadOnly: true
                }) : "");
            }

        }
        else if (event.target.id === "delete") {
            if (this.state.CheckState.length === 0) {
                alert("請句選");
                this.setState({
                    ModalID: "delete",
                    CID: "",
                    CName: "",
                    CBirth: "",
                    CPhone: "",
                    CEmail: "",
                    CAge: "",
                    CDiscount: "",
                    ReadOnly: false
                })
            }
            else if (this.state.CheckState.length > 1) {
                alert("請勿句選超過一項");
                this.setState({
                    ModalID: "delete",
                    CID: "",
                    CName: "",
                    CBirth: "",
                    CPhone: "",
                    CEmail: "",
                    CAge: "",
                    CDiscount: "",
                    ReadOnly: false
                })
            }
            else {
                this.setState({ ModalTitle: "刪除客戶資料", show: true });
                this.state.customer.map((item, index) => item.CID === this.state.CheckState[0] ? this.setState({
                    ModalID: "delete",
                    CID: item.CID,
                    CName: item.CName,
                    CBirth: item.CBirth,
                    CPhone: item.CPhone,
                    CEmail: item.CEmail,
                    CAge: item.CAge,
                    CPhoto: "",
                    CDiscount: item.CDiscount,
                    ReadOnly: true
                }) : "");
            }
        }
    }

    ChangeChecked(event) {
        var newCheck = [...this.state.CheckState];
        if (event.target.checked === true) {
            newCheck = [...this.state.CheckState, event.target.id];
        }
        else {
            newCheck.map((item, _index) => item === event.target.id ? newCheck.splice(_index, 1) : item);
        }
        this.setState({
            CheckState: newCheck,
        });
    }

    componentDidMount() {
        fetch("/api/customer")
            .then(res => res.json())
            .then(data => this.setState({ customer: data.data }));
    }

    render() {
        let Sum = 0, Ave = 0;
        this.state.customer.forEach(res => {
            Sum += 1;
            Ave += parseFloat(res.CAge);
        });
        Ave /= Sum;
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Form>
                            <Form.Row className="input">
                                <InputGroup id="CS_id">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>身份證字號/統一編號</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="input-ID" onChange={this.handleInputeChange} onCompositionStart={this.handleComposition} onCompositionEnd={this.handleComposition} />
                                </InputGroup>
                                <InputGroup id="CS_name">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>姓名</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="input-name" onChange={this.handleInputeChange} onCompositionStart={this.handleComposition} onCompositionEnd={this.handleComposition} />
                                </InputGroup>
                            </Form.Row>
                            <Button variant="primary" id="insert" onClick={this.UpdateModal}>新增</Button>
                            <Button variant="primary" id="update" onClick={this.UpdateModal}>修改</Button>
                            <Button variant="primary" id="delete" onClick={this.UpdateModal}>刪除</Button>
                            <Form.Row className="table">
                                <Table striped bordered hover id="TableBlock">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>姓名</th>
                                            <th>身份證字號/統一編號</th>
                                            <th>生日</th>
                                            <th>電話</th>
                                            <th>E-mail</th>
                                            <th>年齡</th>
                                            <th>會員折扣</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.customer.map(res =>
                                                <tr key={res.CID}>
                                                    <td><Form.Check id={res.CID} onChange={this.ChangeChecked} /></td>
                                                    <td>{res.CID}</td>
                                                    <td>{res.CName}</td>
                                                    <td>{res.CBirth}</td>
                                                    <td>{res.CPhone}</td>
                                                    <td >{res.CEmail}</td>
                                                    <td >{res.CAge}</td>
                                                    <td>{res.CDiscount}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </Form.Row>
                        </Form>
                    </Col>
                    <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.ModalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={(event) => this.handleSubmit(event)}>
                                <InputGroup id="CID">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>統一編號/身份證字號</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="inputID" defaultValue={this.state.CID} readOnly={this.state.ReadOnly} />
                                </InputGroup>
                                <InputGroup id="CName">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>姓名</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="inputName" defaultValue={this.state.CName} />
                                </InputGroup>
                                <InputGroup id="CBirth">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>生日</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type="date" name="inputBirth" defaultValue={this.state.CBirth}>
                                    </FormControl>
                                </InputGroup>
                                <InputGroup id="CPhone">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>手機號碼</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="inputPhone" defaultValue={this.state.CPhone} />
                                </InputGroup>
                                <InputGroup id="CEmail">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>E-mail</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type="email" name="inputEmail" defaultValue={this.state.CEmail} />
                                </InputGroup>
                                <InputGroup id="CAge">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>年齡</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="inputAge" defaultValue={this.state.CAge} />
                                </InputGroup>
                                <Form.File id="formcheck-api-custom CPhoto" custom>
                                    <Form.File.Input isValid name="inputPhoto" />
                                    <Form.File.Label data-browse="Button text">
                                    </Form.File.Label>
                                </Form.File>
                                <InputGroup id="CDiscount">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>折扣</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="inputDiscount" defaultValue={this.state.CDiscount} />
                                </InputGroup>
                                <Button id="modal_submit" variant="primary" type="submit" >{this.state.ModalID}</Button>
                                <Button id="modal_cancel" variant="secondary" onClick={() => this.setState({ show: false })}>Cancel</Button>
                            </Form >
                        </Modal.Body>
                    </Modal>
                    <Col xs lg="3">
                        <CSInfoBlock Sum={Sum} Ave={Ave} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Customer