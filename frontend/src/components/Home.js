import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Products from './Products';
import { listProducts } from '../actions/productAction';
import Loader from './Loader';
import Message from './Message';

const Home = () => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(
		() => {
			dispatch(listProducts());
		},
		[ dispatch ]
	);
	return (
		<div>
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message className="danger">{error}</Message>
			) : (
				<Row>
					{products.map((product) => (
						<Col sm={12} md={3} lg={4} xl={3}>
							<Products product={product} />
						</Col>
					))}
				</Row>
			)}
		</div>
	);
};

export default Home;
