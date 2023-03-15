import { useNavigate } from "react-router-dom";
import { Badge, Card, Col } from 'antd';
//import moment from 'moment';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from "../../context/cart";
import { toast } from "react-hot-toast";

const ProductCard = ({ products, colSize }) => {

    const { Meta } = Card;

    const [cart, setCart] = useCart();

    const navigate = useNavigate();

    const handleCart = (prod) => {
        setCart([...cart, prod]);
        localStorage.setItem('cart', JSON.stringify([...cart, prod]))
        toast.success('Cart updated successfully', {position: 'top-right'})
    }


    const viewProduct = (slug) => {
        navigate(`/product/${slug}`)
    }

    return (
        <>
            {
                products?.map((p) => (                    
                    
                    <Col span={colSize} offset={2} key={p._id}>
                        <Badge.Ribbon
                            text={`${p.quantity > 0 ? `${p.quantity} in stock` : 'Out of stock'}`}
                            color={p.quantity > 0 ? 'green' : 'red'}
                        >
                            <Card
                                style={{ width: 300, height: 335, margin: 25 }}
                                cover={
                                    <img style={{ height: 180 }} alt={p.name} src={`${process.env.REACT_APP_API}/product/photo/${p._id}`} />
                                }
                                hoverable
                                actions={[

                                    <ShoppingCartOutlined key='addToCart' onClick={() => handleCart(p)} />,
                                    <EyeOutlined key='viewProduct' onClick={() => viewProduct(p.slug)} />
                                ]}
                            >
                                <Meta                                    
                                    title={p.name}
                                    description={`${p?.description?.substring(0, 20)}...`}
                                />
                                <h4>{p?.price.toLocaleString("en-US",{
                                    style: 'currency',
                                    currency: 'USD'
                                })}</h4>
                            </Card>
                        </Badge.Ribbon>
                    </Col>
                  

                ))
            }
        </>
    )
}

ProductCard.defaultProps = {
    colSize: 8
  }

export default ProductCard;