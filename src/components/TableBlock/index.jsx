import React from "react"
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"

class TableBlock extends React.Component {
    render() {
        return (
            <Form>
                <Table striped bordered hover id="TableBlock">
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>E-mail</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <Form.Check aria-label="option 1" />
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <Form.Check aria-label="option 1" />
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <Form.Check aria-label="option 1" />
                            <td>3</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                    </tbody>
                </Table>
            </Form>
        )
    }
}

export default TableBlock