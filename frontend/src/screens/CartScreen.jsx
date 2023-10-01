import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Card, ListGroup, Image, Button } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import { overwriteQuantity, removeFromCart } from '../slices/cartSlice'

const CartScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  const { cartItems, totalNumberOfItems, itemsPrice } = cart

  const updateQuantityHandler = async (product, qty) => {
    dispatch(overwriteQuantity({ ...product, qty }))
  }

  const removeFromCartHandler = async (productId) => {
    dispatch(removeFromCart(productId))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <>
      <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
      <Row>
        {cartItems.length === 0 ? (
          <Col md={12}>
            <Message>
              Your cart is empty. <Link to='/'>Continue shopping</Link>
            </Message>
          </Col>
        ) : (
          <>
            <Col md={8}>
              <ListGroup variant='flush'>
                {cartItems.map((cartItem) => (
                  <ListGroup.Item key={cartItem._id}>
                    <Row>
                      <Col md={2}>
                        <Link to={`/product/${cartItem._id}`}>
                          <Image
                            src={cartItem.image}
                            alt={cartItem.name}
                            fluid
                            rounded
                          />
                        </Link>
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${cartItem._id}`}>
                          {cartItem.name}
                        </Link>
                      </Col>
                      <Col md={2}>€{cartItem.price}</Col>
                      <Col md={2}>
                        <Form.Select
                          value={cartItem.qty}
                          onChange={(e) => {
                            updateQuantityHandler(
                              cartItem,
                              Number(e.target.value)
                            )
                          }}
                        >
                          {[...Array(cartItem.countInStock).keys()].map((q) => (
                            <option key={q + 1} value={q + 1}>
                              {q + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={2}>
                        <Button
                          type='button'
                          variant='light'
                          onClick={() => removeFromCartHandler(cartItem._id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>You have {totalNumberOfItems} items in cart</h2>€
                    {itemsPrice}
                  </ListGroup.Item>
                  <ListGroup.Item className='d-grid gap-2'>
                    <Button
                      disabled={cartItems.length === 0}
                      type='button'
                      onClick={checkoutHandler}
                    >
                      Proceed to Checkout
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </>
  )
}

export default CartScreen
