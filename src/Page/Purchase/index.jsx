import React from "react"
import PCInfoBlock from "../../components/PC_InfoBlock"
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
class Purchase extends React.Component {
    constructor(props) {
        super(props);
        this.state = { purchase: [], supplier: [], flower: [], customer: [], CheckState: [], show: false, ModalID: "", ModalTitle: "", ID: "", Name: "", PID: "", P_FID: "", P_FName: "", P_CID: "", P_SName: "", PQuantity: "", PSellingPrice: "", POrder: "", PEstimate: "", PActual: "", ReadOnly: true };
        this.handleInputeChange = this.handleInputeChange.bind(this);
        this.handleComposition = this.handleComposition.bind(this);
        this.SearchSpecific = this.SearchSpecific.bind(this);
        this.initState = this.initState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.UpdateModal = this.UpdateModal.bind(this);
        this.ChangeChecked = this.ChangeChecked.bind(this);
        this.SeletedChange = this.SeletedChange.bind(this);
        this.UnShipping = this.UnShipping.bind(this);
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
        const url = "/api/purchase/Search/?id=" + this.state.ID + "&name=" + this.state.Name;
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
            .then(data => this.setState({ purchase: data.data })
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
        this.setState({ purchase: [] });
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("id", this.state.PID);
        formData.append("fid", event.target.inputID.value);
        formData.append("fname", event.target.inputName.value);
        formData.append("cid", event.target.inputCID.value);
        formData.append("sname", event.target.inputSName.value);
        formData.append("quantity", event.target.inputQuantity.value);
        formData.append("sellprice", event.target.inputSell.value);
        formData.append("order", event.target.inputOrder.value);
        formData.append("estimate", event.target.inputEstimate.value);
        formData.append("actual", event.target.inputActual.value);
        if (this.state.ModalID === "insert") {
            fetch("/api/purchase/", {
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
        }
        else if (this.state.ModalID === "update") {
            fetch("/api/purchase/", {
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
        }
        else if (this.state.ModalID === "delete") {
            fetch("/api/purchase/", {
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

        }
        fetch("/api/purchase")
            .then(res => res.json())
            .then(data => this.setState({ purchase: data.data }));

        this.setState({
            ModalID: "",
            PID: "",
            P_FID: "",
            P_FName: "",
            P_CID: "",
            P_SName: "",
            PQuantity: "",
            PSellingPrice: "",
            POrder: "",
            PEstimate: "",
            PActual: "",
            ReadOnly: false,
            CheckState: [],
        })

    }

    UpdateModal(event) {
        if (event.target.id === "insert") {
            this.setState({
                ModalID: "insert",
                PID: "",
                P_FID: "",
                P_FName: "",
                P_CID: "",
                P_SName: "",
                PQuantity: "",
                PSellingPrice: "",
                POrder: "",
                PEstimate: "",
                PActual: "",
                ReadOnly: false
            })
            this.setState({ ModalTitle: "新增購買資料", show: true });
        }
        else if (event.target.id === "update") {
            if (this.state.CheckState.length === 0) {
                alert("請句選");
                this.setState({
                    ModalID: "update",
                    PID: "",
                    P_FID: "",
                    P_FName: "",
                    P_CID: "",
                    P_SName: "",
                    PQuantity: "",
                    PSellingPrice: "",
                    POrder: "",
                    PEstimate: "",
                    PActual: "",
                    ReadOnly: false
                })
            }
            else if (this.state.CheckState.length > 1) {
                alert("請勿句選超過一項");
                this.setState({
                    ModalID: "update",
                    PID: "",
                    P_FID: "",
                    P_FName: "",
                    P_CID: "",
                    P_SName: "",
                    PQuantity: "",
                    PSellingPrice: "",
                    POrder: "",
                    PEstimate: "",
                    PActual: "",
                    ReadOnly: false
                })
            }
            else {
                this.setState({ ModalTitle: "修改購買資料", show: true });
                this.state.purchase.map((item, index) => item.PID === this.state.CheckState[0] ? this.setState({
                    ModalID: "update",
                    PID: item.PID,
                    P_FID: item.P_FID,
                    P_FName: item.P_FName,
                    P_CID: item.P_CID,
                    P_SName: item.P_SName,
                    PQuantity: item.PQuantity,
                    PSellingPrice: item.PSellingPrice,
                    POrder: item.POrderDate,
                    PEstimate: item.PEstimatedDate,
                    PActual: item.PActualDate,
                    ReadOnly: true
                }) : "");
            }

        }
        else if (event.target.id === "delete") {
            if (this.state.CheckState.length === 0) {
                alert("請句選");
                this.setState({
                    ModalID: "delete",
                    PID: "",
                    P_FID: "",
                    P_FName: "",
                    P_CID: "",
                    P_SName: "",
                    PQuantity: "",
                    PSellingPrice: "",
                    POrder: "",
                    PEstimate: "",
                    PActual: "",
                    ReadOnly: false
                })
            }
            else if (this.state.CheckState.length > 1) {
                alert("請勿句選超過一項");
                this.setState({
                    ModalID: "delete",
                    PID: "",
                    P_FID: "",
                    P_FName: "",
                    P_CID: "",
                    P_SName: "",
                    PQuantity: "",
                    PSellingPrice: "",
                    POrder: "",
                    PEstimate: "",
                    PActual: "",
                    ReadOnly: false
                })
            }
            else {
                this.setState({ ModalTitle: "刪除購買資料", show: true });
                this.state.purchase.map((item, index) => item.PID === this.state.CheckState[0] ? this.setState({
                    ModalID: "delete",
                    PID: item.PID,
                    P_FID: item.P_FID,
                    P_FName: item.P_FName,
                    P_CID: item.P_CID,
                    P_SName: item.P_SName,
                    PQuantity: item.PQuantity,
                    PSellingPrice: item.PSellingPrice,
                    POrder: item.POrderDate,
                    PEstimate: item.PEstimatedDate,
                    PActual: item.PActualDate,
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

    SeletedChange(event) {
        this.state.flower.map((item, index) => item.FID === event.target.value ? this.setState({
            P_FName: item.FName,
            PSellingPrice: item.FUnitPrice,
            ReadOnly: false
        }) : "");

    }

    UnShipping(event) {
        if (event.target.checked === true) {
            var t = [];
            this.state.purchase.map((item, index) => item.PActualDate === null ? t.push(item) : "");
            this.setState({ purchase: t });
        }
        else {
            if (this.state.ID === "" && this.state.Name === "") {
                fetch("/api/purchase")
                    .then(res => res.json())
                    .then(data => this.setState({ purchase: data.data }));
            }
            else {
                this.SearchSpecific();
            }
        }
    }

    componentDidMount() {
        fetch("/api/purchase")
            .then(res => res.json())
            .then(data => this.setState({ purchase: data.data }));
        fetch("/api/flower")
            .then(res => res.json())
            .then(data => this.setState({ flower: data.data }));
        fetch("/api/customer")
            .then(res => res.json())
            .then(data => this.setState({ customer: data.data }));
        fetch("/api/supplier")
            .then(res => res.json())
            .then(data => this.setState({ supplier: data.data }));
    }

    render() {
        let Sum = 0, Before_Money = 0, After_Money = 0;
        this.state.purchase.forEach(res => {
            Sum += parseInt(res.PQuantity);
            if (res.PActualDate === "0000-00-00")
                Before_Money += parseFloat(res.PAfterDiscount);
            else
                After_Money += parseFloat(res.PAfterDiscount);
        });
        return (
            <Container fluid id="showblock" ref={el => (this.componentRef = el)}>
                <Row  >
                    <Col>
                        <Form>
                            <Form.Row className="input">
                                <InputGroup id="PU_id">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>花草苗木編號</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="input-ID" onChange={this.handleInputeChange} onCompositionStart={this.handleComposition} onCompositionEnd={this.handleComposition} />
                                </InputGroup>
                                <InputGroup id="PU_name">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>客戶統一編號/身份證字號</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="input-name" onChange={this.handleInputeChange} onCompositionStart={this.handleComposition} onCompositionEnd={this.handleComposition} />
                                </InputGroup>
                                <Form.Check type="checkbox" id="customControlAutosizing" label="未出貨" custom onChange={this.UnShipping} />
                            </Form.Row>
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
                            <Form.Row className="table">
                                <Table striped bordered hover id="TableBlock">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>花草苗木編號</th>
                                            <th>花草苗木名稱</th>
                                            <th>客戶統一編號/身份證字號</th>
                                            <th>供應商名稱</th>
                                            <th>購買數量</th>
                                            <th>售價</th>
                                            <th>折扣後</th>
                                            <th>訂購日期</th>
                                            <th>預計交貨日期</th>
                                            <th>實際交貨日期</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.purchase.map(res =>
                                                <tr key={res.PID}>
                                                    <td><Form.Check id={res.PID} onChange={this.ChangeChecked} /></td>
                                                    <td>{res.P_FID}</td>
                                                    <td>{res.P_FName}</td>
                                                    <td>{res.P_CID}</td>
                                                    <td >{res.P_SName}</td>
                                                    <td >{res.PQuantity}</td>
                                                    <td >{res.PSellingPrice}</td>
                                                    <td>{res.PAfterDiscount}</td>
                                                    <td >{res.POrderDate}</td>
                                                    <td >{res.PEstimatedDate}</td>
                                                    <td >{res.PActualDate}</td>
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
                                <InputGroup id="P_FID">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>花草苗木編號</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl as="select" name="inputID" defaultValue={this.state.P_FID} onChange={this.SeletedChange} readOnly={this.state.ReadOnly}>
                                        {
                                            this.state.flower.map(res =>
                                                <option key={res.FID} value={res.FID}>{res.FID}</option>
                                            )
                                        }
                                    </FormControl>
                                </InputGroup>
                                <InputGroup id="P_FName">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>花草苗木名稱</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="inputName" defaultValue={this.state.P_FName} readOnly={true} />
                                </InputGroup>
                                <InputGroup id="P_CID">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>客戶統一編號/身份證字號</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl as="select" name="inputCID" defaultValue={this.state.P_CID} >
                                        {
                                            this.state.customer.map(res =>
                                                <option key={res.CID} value={res.CID}>{res.CID}</option>
                                            )
                                        }
                                    </FormControl>
                                </InputGroup>
                                <InputGroup id="P_SName">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>供應商名稱</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl as="select" name="inputSName" defaultValue={this.state.P_SName} >
                                        {
                                            this.state.supplier.map(res =>
                                                <option key={res.STaxNumber} value={res.SName}>{res.SName}</option>
                                            )
                                        }
                                    </FormControl>
                                </InputGroup>
                                <InputGroup id="PQuantity">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>購買數量</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="inputQuantity" defaultValue={this.state.PQuantity} />
                                </InputGroup>
                                <InputGroup id="PSell">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>售價</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl name="inputSell" defaultValue={this.state.PSellingPrice} readOnly={true} />
                                </InputGroup>
                                <InputGroup id="POrder">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>訂購日期</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type="date" name="inputOrder" defaultValue={this.state.POrder} />
                                </InputGroup>
                                <InputGroup id="PEstimate">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>預計交貨日期</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type="date" name="inputEstimate" defaultValue={this.state.PEstimate} />
                                </InputGroup>
                                <InputGroup id="PActual">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>實際交貨日期</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type="date" name="inputActual" defaultValue={this.state.PActual} />
                                </InputGroup>
                                <Button id="modal_submit" variant="primary" type="submit" >{this.state.ModalID}</Button>
                                <Button id="modal_cancel" variant="secondary" onClick={() => this.setState({ show: false })}>Cancel</Button>
                            </Form >
                        </Modal.Body>
                    </Modal>
                    <Col xs lg="3">
                        <PCInfoBlock Sum={Sum} Before_Money={Before_Money} After_Money={After_Money} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Purchase