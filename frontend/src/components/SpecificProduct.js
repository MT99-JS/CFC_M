import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../actions/productAction';

import { Form,Row, Col, ListGroupItem, ListGroup, Card, Button } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';

const SpecificProduct = ({ history,match }) => {
    const [qty,setQty] = useState(1)
	const dispatch = useDispatch();
	const fetchedProduct = useSelector((state) => state.fetchedProduct);
	const { loading,error,product } = fetchedProduct;

	useEffect(
		() => {
			dispatch(fetchProduct(match.params.id));
		},
		[ dispatch, match ]
    );
    
    const addToCart = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
	return (
        <>
        {loading ? ( <Loader/>) : error ? (<Message className="danger">{error}</Message>):(
          <Row>
			<Col md={6}>
				<Card className="my-3 p-3 mx-3 " style={{ width: '30rem' }}>
					<Card.Img variant="top" src={product.image} />
				</Card>
			</Col>

			<Col md={3}>
				<Card
					style={{
						height: '20vh',
						marginTop: '20px',
						marginRight: '100px',
						marginLeft: '-300px'
					}}
				>
					<ListGroup>
						<ListGroupItem>
							<strong>{product.name}</strong>
						</ListGroupItem>
						<ListGroupItem>{product.description}</ListGroupItem>

						<ListGroupItem>
							<strong>${product.price}</strong>
						</ListGroupItem>
						<ListGroupItem>{product.numReviews} Reviews</ListGroupItem>
					</ListGroup>
				</Card>
			</Col>
			<Col style={{ marginTop: '20px', marginLeft: '-100px', marginRight: '100px' }}>
				<ListGroup>
					<ListGroupItem>
						<strong>${product.price}</strong>
					</ListGroupItem>
					<ListGroupItem>Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</ListGroupItem>
                    <ListGroupItem>
                        <Row><Col>Qty</Col>
                        <Col>
                     <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>{[...Array(product.countInStock).keys()].map(x=>(<option key={x+1} value={x+1}>{x+1}</option>))}</Form.Control>
                          </Col>
                    </Row>
                    </ListGroupItem>
					<ListGroupItem>
						<Button  onClick={addToCart} variant="dark" disabled={product.countInStock === 0}>
							Add to cart
						</Button>
					</ListGroupItem>
				</ListGroup>
			</Col>
		</Row>
        )}
		
        </>
	);
};

export default SpecificProduct;
