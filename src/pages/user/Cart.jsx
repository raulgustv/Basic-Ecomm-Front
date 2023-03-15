import { DeleteOutlined } from "@ant-design/icons";
import { Row, Col, Card, Divider } from "antd";
import { Link } from "react-router-dom";
import { CartSummary, Jumbotron } from "../../components/cards";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart"


const Cart = () => {

    const [cart, setCart] = useCart();
    const [auth] = useAuth();

    const { user } = auth;

    const { Meta } = Card;

    const handleDeleteCart = (prodId) => {
        let userCart = [...cart];

        let index = userCart.findIndex((item) => item._id === prodId);

        userCart.splice(index, 1);

        setCart(userCart);
        localStorage.setItem('cart', JSON.stringify(userCart))
    }   

    //console.log(cartTotal())    

    return (
        <>
            <Jumbotron
                title='Cart'
                subtitle={
                    user !== null ? `You have ${cart.length} ${cart.length === 1 ? 'item' : 'items'} in your cart`
                        : <Link to='/login'>Please login to checkout</Link>
                }
            />

            <div className="container-fluid">
                <Row>
                    <Col span={24}>
                        <div className="p-3 mt-2 mb-2 h4 bg-light">
                            {cart?.length ? 'Cart items' : <Link to='/shop'>Continue Shopping</Link>}
                        </div>
                    </Col>
                </Row>
            </div>

            {cart?.length > 0 && (
                <div className="container-fluid">
                    <Row>
                        <Col span={16}>
                            <Row gutter={[15, 15]}>
                                {cart.map((c, index) => (
                                    <Col key={index} span={8}>
                                        <Card
                                            size="small"
                                            title={c.name}
                                            cover={
                                                <img style={{ height: 120, width: 200 }} alt={c.name} src={`${process.env.REACT_APP_API}/product/photo/${c._id}`} />
                                            }
                                            style={{ width: 250 }}
                                            actions={[
                                                <DeleteOutlined onClick={() => { handleDeleteCart(c._id) }} />
                                            ]}
                                        >
                                            <Meta
                                                title={c?.price?.toLocaleString('en-US', {
                                                    style: "currency",
                                                    currency: 'USD'
                                                })}
                                            />
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>

                        <Col span={1}>
                            <Divider type="vertical" style={{ height: '100%' }} />
                        </Col>

                        <Col span={7}>

                           <CartSummary /> 
                        </Col>
                    </Row>
                </div>
            )}
        </>
    )
}

export default Cart