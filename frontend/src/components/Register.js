import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import FormContainer from './FormContainer';

import Message from './Message';
import Loader from './Loader';

const Register = ({ history, location }) => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ message, setMessage ] = useState('');

	const redirect = location.search ? location.search.split('=')[1] : '/';

	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);
	console.log(userRegister);
	const { loading, error, userInfo } = userRegister;
	useEffect(
		() => {
			if (userInfo) {
				history.push(redirect);
			}
		},
		[ history, userInfo, redirect ]
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formBasicName">
					<Form.Label>Name</Form.Label>
					<Form.Control type="name" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
				</Form.Group>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
					<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="formBasicConfirmmPassword">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm Password"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</FormContainer>
	);
};

export default Register;
