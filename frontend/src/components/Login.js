import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import Message from './Message';
import Loader from './Loader';
import FormContainer from './FormContainer';

const Login = ({ history, location }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const redirect = location.search ? location.search.split('=')[1] : '/';

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;
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
		dispatch(login(email, password));
	};

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={handleSubmit}>
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

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default Login;
