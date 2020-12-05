import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Products = ({ product }) => {
	return (
		<div>
			<Card className="my-3 p-3 rounded">
				<Container>
					<Card.Img variant="top" src={product.image} />
					<Card.Body>
						<LinkContainer style={{ cursor: 'pointer' }} to={`/product/${product._id}`}>
							<Card.Title>
								<strong>{product.name}</strong>
							</Card.Title>
						</LinkContainer>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">{product.brand}</small>
					</Card.Footer>
				</Container>
			</Card>
		</div>
	);
};

export default Products;
