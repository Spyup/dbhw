import React from "react"
import SPInfoBlock from "../../components/SP_InfoBlock"
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

class Supplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = { supplier: [], CheckState: [], Money: 0, Sum: 0, show: false, ModalID: "", ModalTitle: "", ID: "", Name: "", SID: "", SName: "", SPhone: "", SEmail: "", SPrincipal: "", ReadOnly: false };
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
        const url = "/api/supplier/Search/?id=" + this.state.ID + "&name=" + this.state.Name;
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
            .then(data => this.setState({ supplier: data.data })
            )
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
        this.setState({ supplier: [] });
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("id", event.target.inputID.value);
        formData.append("name", event.target.inputName.value);
        formData.append("phone", event.target.inputPhone.value);
        formData.append("email", event.target.inputEmail.value);
        formData.append("principal", event.target.inputPrincipal.value);
        if (this.state.ModalID === "insert") {
            fetch("/api/supplier/", {
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
            fetch("/api/supplier")
                .then(res => res.json())
                .then(data => this.setState({ supplier: data.data }));
        }
        else if (this.state.ModalID === "update") {
            fetch("/api/supplier/", {
                method: "PUT",
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
            fetch("/api/supplier")
                .then(res => res.json())
                .then(data => this.setState({ supplier: data.data }));
        }
        else if (this.state.ModalID === "delete") {
            fetch("/api/supplier/", {
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
            fetch("/api/supplier")
                .then(res => res.json())
                .then(data => this.setState({ supplier: data.data }));
        }


        this.setState({
            ModalID: "",
            SID: "",
            SName: "",
            SPhone: "",
            SEmail: "",
            SPrincipal: "",
            ReadOnly: false,
            CheckState: [],
        })

    }

    UpdateModal(event) {
        if (event.target.id === "insert") {
            this.setState({
                ModalID: "insert",
                SID: "",
                SName: "",
                SPhone: "",
                SEmail: "",
                SPrincipal: "",
                ReadOnly: false
            })
            this.setState({ ModalTitle: "新增供應商資料", show: true });
        }
        else if (event.target.id === "update") {
            if (this.state.CheckState.length === 0) {
                alert("請句選");
                this.setState({
                    ModalID: "update",
                    SID: "",
                    SName: "",
                    SPhone: "",
                    SEmail: "",
                    SPrincipal: "",
                    ReadOnly: false
                })
            }
            else if (this.state.CheckState.length > 1) {
                alert("請勿句選超過一項");
                this.setState({
                    ModalID: "update",
                    SID: "",
                    SName: "",
                    SPhone: "",
                    SEmail: "",
                    SPrincipal: "",
                    ReadOnly: false
                })
            }
            else {
                this.setState({ ModalTitle: "修改供應商資料", show: true });
                this.state.supplier.map((item, index) => item.STaxNumber === this.state.CheckState[0] ? this.setState({
                    ModalID: "update",
                    SID: item.STaxNumber,
                    SName: item.SName,
                    SPhone: item.SPhone,
                    SEmail: item.SEmail,
                    SPrincipal: item.SPrincipal,
                    ReadOnly: true
                }) : "");
            }

        }
        else if (event.target.id === "delete") {
            if (this.state.CheckState.length === 0) {
                alert("請句選");
                this.setState({
                    ModalID: "delete",
                    SID: "",
                    SName: "",
                    SPhone: "",
                    SEmail: "",
                    SPrincipal: "",
                    ReadOnly: false
                })
            }
            else if (this.state.CheckState.length > 1) {
                alert("請勿句選超過一項");
                this.setState({
                    ModalID: "delete",
                    SID: "",
                    SName: "",
                    SPhone: "",
                    SEmail: "",
                    SPrincipal: "",
                    ReadOnly: false
                })
            }
            else {
                this.setState({ ModalTitle: "刪除供應商資料", show: true });
                this.state.supplier.map((item, index) => item.STaxNumber === this.state.CheckState[0] ? this.setState({
                    ModalID: "delete",
                    SID: item.STaxNumber,
                    SName: item.SName,
                    SPhone: item.SPhone,
                    SEmail: item.SEmail,
                    SPrincipal: item.SPrincipal,
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
        fetch("/api/supplier")
            .then(res => res.json())
            .then(data => this.setState({ supplier: data.data }));
    }

    render() {
        let Sum = 0, Email = 0, Principal = 0;
        let Email_Map = {}, Principal_Map = {};
        this.state.supplier.forEach(res => {
            Sum += 1;
            Email_Map[res.SEmail] = Email_Map[res.SEmail] ? Email++ : 1;
            Principal_Map[res.SPrincipal] = Principal_Map[res.SPrincipal] ? Principal++ : 1;
        });
        return (
            <Container fluid id="showblock">
                <Row>
                    <Col>
                        <Form>
                            <Form.Row className="input">
                                <InputGroup id="SU_id">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>統一編號</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="input-ID" onChange={this.handleInputeChange} onCompositionStart={this.handleComposition} onCompositionEnd={this.handleComposition} />
                                </InputGroup>
                                <InputGroup id="SU_name">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>名稱</InputGroup.Text>
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
                                            <th>統一編號</th>
                                            <th>名稱</th>
                                            <th>電話</th>
                                            <th>E-mail</th>
                                            <th>負責人</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.supplier.map(res =>
                                                <tr key={res.STaxNumber}>
                                                    <td><Form.Check id={res.STaxNumber} onChange={this.ChangeChecked} /></td>
                                                    <td>{res.STaxNumber}</td>
                                                    <td>{res.SName}</td>
                                                    <td>{res.SPhone}</td>
                                                    <td>{res.SEmail}</td>
                                                    <td >{res.SPrincipal}</td>
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
                                <InputGroup id="SID">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>編號</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="inputID" defaultValue={this.state.SID} readOnly={this.state.ReadOnly} />
                                </InputGroup>
                                <InputGroup id="SName">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>供應商名稱</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="inputName" defaultValue={this.state.SName} />
                                </InputGroup>
                                <InputGroup id="SPhone">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>電話</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="inputPhone" defaultValue={this.state.SPhone} />
                                </InputGroup>
                                <InputGroup id="SEmail">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>E-mail</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="inputEmail" defaultValue={this.state.SEmail} />
                                </InputGroup>
                                <InputGroup id="SPrincipal">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>負責人</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="inputPrincipal" defaultValue={this.state.SPrincipal} />
                                </InputGroup>
                                <Button id="modal_submit" variant="primary" type="submit" >{this.state.ModalID}</Button>
                                <Button id="modal_cancel" variant="secondary" onClick={() => this.setState({ show: false })}>Cancel</Button>
                            </Form >
                        </Modal.Body>
                    </Modal>
                    <Col xs lg="3">
                        <SPInfoBlock Sum={Sum} Email={Email} Principal={Principal} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Supplier