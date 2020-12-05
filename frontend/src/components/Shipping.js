import React, { useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addShippingAddress } from '../actions/cartActions';
import CheckoutSteps from './CheckoutSteps';

const Shipping = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [ address, setAddress ] = useState(shippingAddress.address);
	const [ city, setCity ] = useState(shippingAddress.city);
	const [ postalCode, setPostalCode ] = useState(shippingAddress.postalCode);
	const [ country, setCountry ] = useState(shippingAddress.country);

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addShippingAddress({ address, city, postalCode, country }));
		history.push('/payment');
	};
	return (
		<div>
			<CheckoutSteps step1 step2 />
			<h2>Shipping Details</h2>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formBasicName">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						value={address}
						placeholder="Enter address"
						onChange={(e) => setAddress(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>City address</Form.Label>
					<Form.Control
						type="text"
						value={city}
						placeholder="Enter city"
						onChange={(e) => setCity(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type="text"
						value={postalCode}
						placeholder="Postal Code"
						onChange={(e) => setPostalCode(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="formBasicConfirmmPassword">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						value={country}
						placeholder="Country"
						onChange={(e) => setCountry(e.target.value)}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Continue
				</Button>
			</Form>
		</div>
	);
};

export default Shipping;
