import react, { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"

class FlowerInsert extends react.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        fetch("/api/supplier")
            .then(res => res.json())
            .then(data => this.setState({ data: data.data }));
    }

    render() {
        return (
            <Form>
                <InputGroup id="FID">
                    <InputGroup.Prepend>
                        <InputGroup.Text>編號</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="input-ID" />
                </InputGroup>
                <InputGroup id="FName">
                    <InputGroup.Prepend>
                        <InputGroup.Text>花草苗木名稱</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="input-name" />
                </InputGroup>
                <InputGroup id="F_SName">
                    <InputGroup.Prepend>
                        <InputGroup.Text>供應商名稱</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="select" id="input-sname">
                        {
                            this.state.data.map(res =>
                                <option key={res.STaxNumber}>{res.SName}</option>
                            )
                        }
                    </FormControl>
                </InputGroup>
                <InputGroup id="FSum">
                    <InputGroup.Prepend>
                        <InputGroup.Text>總數</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="input-sum" />
                </InputGroup>
                <InputGroup id="FUnit">
                    <InputGroup.Prepend>
                        <InputGroup.Text>單位</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="input-unit" />
                </InputGroup>
                <InputGroup id="FUnitPrice">
                    <InputGroup.Prepend>
                        <InputGroup.Text>單價</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="input-unitprice" />
                </InputGroup>
                <InputGroup id="FLocate">
                    <InputGroup.Prepend>
                        <InputGroup.Text>位置</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="input-locate" />
                </InputGroup>
                <InputGroup id="FDate">
                    <InputGroup.Prepend>
                        <InputGroup.Text>日期</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl type="date" id="input-date" />
                </InputGroup>
            </Form >
        )
    }
}

function ModalBlock(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var title = props.action + props.locate;

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {props.action}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FlowerInsert />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        取消
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {props.action}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalBlock