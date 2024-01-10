import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import {baseUrl} from '../../../config/baseUrl.js';
import { useDispatch,useSelector } from 'react-redux';
import { login,editUser } from '../../actions.js';


const EditUser = () => {
    const user=useSelector((state)=>state.user.edituser)
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [id, setId] = useState(user._id);
    const admin=useSelector((state)=>state.user.admin)
    // const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch()
    const navigate=useNavigate()
    console.log('this is for token', admin.token);

    const submitHandler = async (e) => {
        e.preventDefault();
        const token= admin.token
        const formData={name,email,id}
        axios.post(`${baseUrl}/admin/editUser`,formData,{headers:{'authorization': token}}).then(respose=>{
            console.log(respose.data.user);
            dispatch(editUser(respose.data.user))
            navigate('/userList')
        })
    };

    return (
        <Container>
            <Row className='justify-content-md-center mt-5'>
                <Col xs={12} md={6} className='card p-5'>
                    <h1>Update User</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='my-2' controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className='my-2' controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        

                        <Button type='submit' variant='primary' className='mt-3'>
                            Submit
                        </Button>
                    </Form>

                    
                </Col>
            </Row>
        </Container>
    );
};

export default EditUser;