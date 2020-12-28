import React from "react"
import FSInfoBlock from "../../components/FS_InfoBlock"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Form from "react-bootstrap/Form"
import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import ReactToPrint, { PrintContextConsumer } from "react-to-print"

let isComposition = false;
const isChrome = navigator.userAgent.indexOf('Chrome') > -1;
let input_ID = "", input_name = "";
var Sum = 0, Money = 0;

class FlowerSeedling extends React.Component {
    constructor(props) {
        super(props);
        this.state = { flower: [], supplier: [], CheckState: [], Money: 0, Sum: 0, show: false, ModalID: "", ModalTitle: "", ID: "", Name: "", FID: "", FName: "", F_SName: "", FSum: "", FUnitPrice: "", FUnit: "", FLocate: "", FDate: "", ReadOnly: false };
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
        const url = "/api/flower/Search/?id=" + this.state.ID + "&name=" + this.state.Name;
        Money = 0;
        Sum = 0;
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
            .then(data => this.setState({ flower: data.data }, () => {
                this.state.flower.map(res => {
                    Sum = Sum + parseInt(res.FSum);
                    Money = Money + parseFloat(res.FSubTotal);
                })
            }, console.log(this.state.Sum)
            ))
            .then(
                this.setState((state) => ({ Sum: Sum, Money: Money }, console.log(this.state.Sum)))
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
        this.setState({ flower: [] });
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("id", event.target.inputID.value);
        formData.append("name", event.target.inputName.value);
        formData.append("sname", event.target.inputSname.value);
        formData.append("sum", event.target.inputSum.value);
        formData.append("unit", event.target.inputUnit.value);
        formData.append("unitprice", event.target.inputUnitPrice.value);
        formData.append("locate", event.target.inputLocate.value);
        formData.append("date", event.target.inputDate.value);
        if (this.state.ModalID === "insert") {
            fetch("/api/flower/", {
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
            fetch("/api/flower")
                .then(res => res.json())
                .then(data => this.setState({ flower: data.data }));
        }
        else if (this.state.ModalID === "update") {
            fetch("/api/flower/", {
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
            fetch("/api/flower")
                .then(res => res.json())
                .then(data => this.setState({ flower: data.data }));
        }
        else if (this.state.ModalID === "delete") {
            fetch("/api/flower/", {
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
            fetch("/api/flower")
                .then(res => res.json())
                .then(data => this.setState({ flower: data.data }));
        }


        this.setState({
            ModalID: "",
            FID: "",
            FName: "",
            F_SName: "",
            FSum: "",
            FUnitPrice: "",
            FUnit: "",
            FLocate: "",
            FDate: "",
            ReadOnly: false
        })

    }

    UpdateModal(event) {
        if (event.target.id === "insert") {
            this.setState({
                ModalID: "insert",
                FID: "",
                FName: "",
                F_SName: "",
                FSum: "",
                FUnitPrice: "",
                FUnit: "",
                FLocate: "",
                FDate: "",
                ReadOnly: false
            })
            this.setState({ ModalTitle: "新增花草苗木資料", show: true });
        }
        else if (event.target.id === "update") {
            if (this.state.CheckState.length === 0) {
                alert("請句選");
                this.setState({
                    ModalID: "update",
                    FID: "",
                    FName: "",
                    F_SName: "",
                    FSum: "",
                    FUnitPrice: "",
                    FUnit: "",
                    FLocate: "",
                    FDate: "",
                    ReadOnly: false
                })
            }
            else if (this.state.CheckState.length > 1) {
                alert("請勿句選超過一項");
                this.setState({
                    ModalID: "update",
                    FID: "",
                    FName: "",
                    F_SName: "",
                    FSum: "",
                    FUnitPrice: "",
                    FUnit: "",
                    FLocate: "",
                    FDate: "",
                    ReadOnly: false
                })
            }
            else {
                this.setState({ ModalTitle: "修改花草苗木資料", show: true });
                this.state.flower.map((item, index) => item.FID === this.state.CheckState[0] ? this.setState({
                    ModalID: "update",
                    FID: item.FID,
                    FName: item.FName,
                    F_SName: item.F_SName,
                    FSum: item.FSum,
                    FUnitPrice: item.FUnitPrice,
                    FUnit: item.FUnit,
                    FLocate: item.FLocate,
                    FDate: item.FDate,
                    ReadOnly: true
                }) : "");
            }

        }
        else if (event.target.id === "delete") {
            if (this.state.CheckState.length === 0) {
                alert("請句選");
                this.setState({
                    ModalID: "delete",
                    FID: "",
                    FName: "",
                    F_SName: "",
                    FSum: "",
                    FUnitPrice: "",
                    FUnit: "",
                    FLocate: "",
                    FDate: "",
                    ReadOnly: false
                })
            }
            else if (this.state.CheckState.length > 1) {
                alert("請勿句選超過一項");
                this.setState({
                    ModalID: "delete",
                    FID: "",
                    FName: "",
                    F_SName: "",
                    FSum: "",
                    FUnitPrice: "",
                    FUnit: "",
                    FLocate: "",
                    FDate: "",
                    ReadOnly: false
                })
            }
            else {
                this.setState({ ModalTitle: "刪除花草苗木資料", show: true });
                this.state.flower.map((item, index) => item.FID === this.state.CheckState[0] ? this.setState({
                    ModalID: "delete",
                    FID: item.FID,
                    FName: item.FName,
                    F_SName: item.F_SName,
                    FSum: item.FSum,
                    FUnitPrice: item.FUnitPrice,
                    FUnit: item.FUnit,
                    FLocate: item.FLocate,
                    FDate: item.FDate,
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
        fetch("/api/flower")
            .then(res => res.json())
            .then(data => this.setState({ flower: data.data }));
        fetch("/api/supplier")
            .then(res => res.json())
            .then(data => this.setState({ supplier: data.data }));
    }


    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Form>
                            <Form.Row className="input">
                                <InputGroup id="FS_id">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>編號</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="input-ID" onChange={this.handleInputeChange} onCompositionStart={this.handleComposition} onCompositionEnd={this.handleComposition} />
                                </InputGroup>
                                <InputGroup id="FS_name">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>花草苗木名稱</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="input-name" onChange={this.handleInputeChange} onCompositionStart={this.handleComposition} onCompositionEnd={this.handleComposition} />
                                </InputGroup>
                            </Form.Row>
                            <Form.Row>
                                <Button variant="primary" id="insert" onClick={this.UpdateModal}>新增</Button>
                                <Button variant="primary" id="update" onClick={this.UpdateModal}>修改</Button>
                                <Button variant="primary" id="delete" onClick={this.UpdateModal}>刪除</Button>
                                <ReactToPrint content={() => this.componentRef}>
                                    <PrintContextConsumer>
                                        {({ handlePrint }) => (
                                            <Button variant="primary" id="print" onClick={handlePrint}>列印</Button>
                                        )}
                                    </PrintContextConsumer>
                                </ReactToPrint>
                            </Form.Row>
                            <Form.Row className="table">
                                <Table striped bordered hover id="TableBlock" ref={el => (this.componentRef = el)}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>編號</th>
                                            <th>名稱</th>
                                            <th>供應商</th>
                                            <th>庫存數量</th>
                                            <th>單價</th>
                                            <th>小計</th>
                                            <th>位置</th>
                                            <th>進貨日期</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.flower.map(res =>
                                                <tr key={res.FID}>
                                                    <td><Form.Check id={res.FID} onChange={this.ChangeChecked} /></td>
                                                    <td>{res.FID}</td>
                                                    <td>{res.FName}</td>
                                                    <td>{res.F_SName}</td>
                                                    <td>{res.FSum}</td>
                                                    <td >{res.FUnitPrice}</td>
                                                    <td >{res.FSubTotal}</td>
                                                    <td >{res.FLocate}</td>
                                                    <td>{res.FDate}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </Form.Row>
                        </Form>

                        <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.ModalTitle}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={(event) => this.handleSubmit(event)}>
                                    <InputGroup id="FID">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>編號</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl name="inputID" defaultValue={this.state.FID} readOnly={this.state.ReadOnly} />
                                    </InputGroup>
                                    <InputGroup id="FName">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>花草苗木名稱</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl name="inputName" defaultValue={this.state.FName} />
                                    </InputGroup>
                                    <InputGroup id="F_SName">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>供應商名稱</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl as="select" name="inputSname" defaultValue={this.state.F_SName}>
                                            {
                                                this.state.supplier.map(res =>
                                                    <option key={res.STaxNumber}>{res.SName}</option>
                                                )
                                            }
                                        </FormControl>
                                    </InputGroup>
                                    <InputGroup id="FSum">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>總數</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl name="inputSum" defaultValue={this.state.FSum} />
                                    </InputGroup>
                                    <InputGroup id="FUnit">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>單位</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl name="inputUnit" defaultValue={this.state.FUnit} />
                                    </InputGroup>
                                    <InputGroup id="FUnitPrice">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>單價</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl name="inputUnitPrice" defaultValue={this.state.FUnitPrice} />
                                    </InputGroup>
                                    <InputGroup id="FLocate">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>位置</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl name="inputLocate" defaultValue={this.state.FLocate} />
                                    </InputGroup>
                                    <InputGroup id="FDate">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>日期</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type="date" name="inputDate" defaultValue={this.state.FDate} />
                                    </InputGroup>
                                    <Button id="modal_submit" variant="primary" type="submit" >{this.state.ModalID}</Button>
                                    <Button id="modal_cancel" variant="secondary" onClick={() => this.setState({ show: false })}>Cancel</Button>
                                </Form >
                            </Modal.Body>
                        </Modal>
                    </Col>
                    <Col xs lg="3">
                        <FSInfoBlock Sum={this.state.Sum} Money={this.state.Money} />
                    </Col>
                </Row>
            </Container >
        )
    }
}

export default FlowerSeedling 