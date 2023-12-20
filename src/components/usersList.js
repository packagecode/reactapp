import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Table, Badge, Button } from 'react-bootstrap';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}:3001/users`).then((response) => {
            setUsers(response.data);
        });
    }, []);


    return (
        <Card body className='mt-5'>
            <h3>Users List</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Sector</th>
                        <th>Agree terms</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.sector_name}</td>
                            <td>
                                {user.agree ? (
                                    <Badge bg="success">Yes</Badge>
                                ) : (
                                    <Badge bg="danger">No</Badge>
                                )}
                            </td>
                            <td>
                                <Button variant="info" className="p-2" href={`editProfile/${user.id}`} size='sm'>
                                    Edit
                                </Button>{' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card>
    );
};

export default UsersList;
