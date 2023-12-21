import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Stack, Button } from 'react-bootstrap';
import Form from '../components/Form';

const EditProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/users/${id}`).then((response) => {
      setUser(response.data);
    });
  }, [id]);

  return (
    <Container className='mt-3'>
      <Row>
        <Col>
          <Stack direction="horizontal" gap={3}>
            <Button variant="success" className="p-2" href="/">Users List</Button>{' '}
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <Form user={user} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
