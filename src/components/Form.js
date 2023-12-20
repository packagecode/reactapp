import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicSelect from './DynamicSelect';
import { Form, Button, Card } from 'react-bootstrap';

const FormExport = ({ user }) => {
  const [name, setName] = useState('');
  const [sectors, setSectors] = useState([]);
  const [agree, setAgree] = useState(false);
  const [validated, setValidated] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);


  useEffect(() => {
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
   
    axios.get(`${process.env.REACT_APP_BASE_URL}:3001/sectors`).then((response) => {
      const dynamicOptions = convertToDynamicOptions(response.data); 
      setSelectedOptions(dynamicOptions);
    });
    setName(user?.name || '');
    setAgree(user?.agree || '');
    setSectors([user?.sector || null]);
  }, [user]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const stringSector = sectors.join(' ');
      if (user) {
        const confirmed = window.confirm('Are you sure you want to update the user?');
        if(confirmed) {
          axios.patch(`${process.env.REACT_APP_BASE_URL}:3001/users/update/${user.id}`, { name, sector: stringSector, agree }).then(() => {
            // setName('');
            // setSectors([]);
            // setAgree(false);
            // alert('Data updated successfully!');
            window.location = '/';
          }); 
        }
      } else {
        axios.post(`${process.env.REACT_APP_BASE_URL}:3001/users/store`, { name, sector: stringSector, agree }).then(() => {
          setName('');
          setSectors([]);
          setAgree(false);

          alert('Data saved successfully!');
        });
      }

      event.preventDefault();
      event.stopPropagation();

    }

    setValidated(true);
  };

  const handleSelectChange = (selectedValues) => {
    setSectors(selectedValues);
  };
  return (
    <Card body className='mt-5'>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Text className="text-muted">
          Please enter your name and pick the Sectors you are currently involved in.
        </Form.Text>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" required value={name} onChange={(e) => setName(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            The name field is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="sectors">
          <Form.Label>Sectors</Form.Label>
          <DynamicSelect options={selectedOptions} selectedOptions={sectors} onSelectChange={handleSelectChange} />
          <Form.Control.Feedback type="invalid">
            The sector field is required.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="agree">
          <Form.Check type="checkbox" label="Agree to terms" required checked={agree} onChange={() => setAgree(!agree)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Card>
  );
};

export default FormExport;
