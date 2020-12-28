import React from "react"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"

class SearchBlock extends React.Component {
    render() {
        return (
            <InputGroup id="SearchBlock">
                <InputGroup.Prepend>
                    <InputGroup.Text>E-mail</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Small" id="input-email" />
            </InputGroup>
        )
    }
}

export default SearchBlock