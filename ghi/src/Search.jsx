import { Form } from 'react-bootstrap'

function Search({ value, onChange }) {
    return (
        <Form.Group controlId="formSearch">
            <Form.Control
                type="text"
                placeholder="Search by product name"
                value={value}
                onChange={onChange}
                style={{
                    width: '400px',
                    margin: '10px auto',
                    textAlign: 'center',
                    padding: '5px',
                }}
            />
        </Form.Group>
    )
}

export default Search
