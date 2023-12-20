import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicSelect from '../../components/DynamicSelect';
import { Container, Row, Col, Stack, Card, Form, Button } from 'react-bootstrap';

const FormExport = () => {
  const [name, setName] = useState('');
  const [sectors, setSectors] = useState([]);
  const [validated, setValidated] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const convertToDynamicOptions = (data, parentId = null) => {
    const options = [];

    for (const item of data) {
      if (item.parent_id === parentId) {
        const option = {
          value: item.id.toString(),
          label: item.name,
        };

        const children = convertToDynamicOptions(data, item.id);

        if (children.length > 0) {
          option.children = children;
        }

        options.push(option);
      }
    }

    return options;
  };

  useEffect(() => {
    axios.get('http://localhost:3001/sectors').then((response) => {
      // eslint-disable-next-line
      const convertedOptions = convertToDynamicOptions(response.data);
      setSelectedOptions(convertedOptions);
    });
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const stringSector = sectors.join(' ');
      axios.post('http://localhost:3001/sectors/store', { name, sector: stringSector }).then(() => {
          setName('');
          setSectors([]);
          alert('Data saved successfully!');
        });

      event.preventDefault();
      event.stopPropagation();

    }

    setValidated(true);
  };

  const handleSelectChange = (selectedValues) => {
    setSectors(selectedValues);
  };
  return (
    <Container className='mt-3'>
      <Row>
        <Col>
          <Stack direction="horizontal" gap={3}>
            <Button variant="success" className="p-2" href="/">Users List</Button>{' '}
            <Button variant="success" className="p-2" href="/sectors">Sectors List</Button>{' '}
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card body className='mt-5'>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" required value={name} onChange={(e) => setName(e.target.value)} />
                <Form.Control.Feedback type="invalid">
                  The name field is required.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="sectors">
                <Form.Label>Parent Sector</Form.Label>
                <DynamicSelect options={selectedOptions} selectedOptions={sectors} onSelectChange={handleSelectChange} />
                <Form.Control.Feedback type="invalid">
                  The sector field is required.
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormExport;
