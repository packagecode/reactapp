import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Stack, Card, Table, Button } from 'react-bootstrap';

const SectorList = () => {
    const [sectors, setSectors] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/sectors?with=parent`).then((response) => {
            setSectors(response.data);
        });
    }, []);


    return (
        <Container className='mt-3'>
            <Row>
                <Col>
                    <Stack direction="horizontal" gap={3}>
                        <Button variant="success" className="p-2" href="/">Users List</Button>{' '}
                        <Button variant="success" className="p-2" href="/addSectors">Add Sector</Button>{' '}
                    </Stack>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card body className='mt-5'>
                        <h3>Sectors List</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Parent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sectors.map((sector, index) => (
                                    <tr key={sector.id}>
                                        <td>{index + 1}</td>
                                        <td>{sector.name}</td>
                                        <td>{sector.parent_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SectorList;
