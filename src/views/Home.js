import React from 'react';
import { Container, Row, Col, Stack, Button } from 'react-bootstrap';
import UsersList from '../components/usersList';

const Home = () => {
  return (
    <Container className='mt-3'>
      <Row>
        <Col>
          <Stack direction="horizontal" gap={3}>
            <Button variant="success" className="p-2" href="/sectors">Sectors</Button>{' '}
            <Button variant="success" className="p-2" href="/addProfile">Add Profile</Button>{' '}
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col>
          <UsersList />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
