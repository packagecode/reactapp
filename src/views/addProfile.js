import React from 'react';
import { Container, Row, Col, Stack, Button } from 'react-bootstrap';
import Form from '../components/Form';

const Home = () => {
  return (
    <Container className='mt-3'>
      <Row>
        <Col>
          <Stack direction="horizontal" gap={3}>
            <Button variant="success" className="p-2" href="/">Users List</Button>{' '}
          </Stack>
          <div>
            <Form />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
