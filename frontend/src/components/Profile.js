import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { myOrderList } from '../actions/orderAction';
import { LinkContainer } from 'react-router-bootstrap';

import Message from './Message';
import Loader from './Loader';

const Profile = ({ history }) => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ message, setMessage ] = useState('');

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;
	console.log(success);

	const orderList = useSelector((state) => state.orderList);
	const { loading: loadingOrders, error: errorOrders, orders } = orderList;

	useEffect(
		() => {
			if (!userInfo) {
				history.push('/login');
			} else {
				if (!user.name) {
					dispatch(getUserDetails('profile'));
					dispatch(myOrderList());
				} else {
					console.log(user.name);
					setName(user.name);
					setEmail(user.email);
				}
			}
		},
		[ dispatch, history, userInfo, user, success ]
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }));
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h1>User Profile</h1>
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{success && <Message variant="success">Profile Updated</Message>}
				{loading && <Loader />}
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formBasicName">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="name"
							value={name}
							placeholder="Enter name"
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							value={email}
							placeholder="Enter email"
							onChange={(e) => setEmail(e.target.value)}
						/>
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
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant="danger">{errorOrders}</Message>
				) : (
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: 'red' }} />
										)}
									</td>
									<td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: 'red' }} />
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button className="btn-sm" variant="light">
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default Profile;
