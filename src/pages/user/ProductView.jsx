import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Jumbotron, ProductCard } from '../../components/cards';
import { getProduct, getRelatedProducts } from '../../actions/product.js'
import { Space, Image, Row, Col, Badge, Divider, Button } from 'antd';
import { CalendarOutlined, FolderOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import moment from 'moment';
import { toast } from 'react-hot-toast';
import { useCart } from '../../context/cart';

const ProductView = () => {


    const params = useParams();

    const [cart, setCart] = useCart()

    const [product, setProduct] = useState({});
    const [visible, setVisible] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const loadProduct = (params) => {
        getProduct(params).then((data) => {
            setProduct(data);
        });
    };

    useEffect(() => {
        loadProduct(params);
        if (product._id
        ) {
            getRelatedProducts(product?._id, product?.category?._id).then((data) => setRelatedProducts(data))
        }
    }, [params, product?._id, product?.category?._id]);


    const handleCart = (prod) =>{
        setCart([...cart, prod]);
        localStorage.setItem('cart', JSON.stringify([...cart, prod]))
        toast.success('Cart updated successfully', {position: 'top-right'})    
    }

    return (
        <>
            <Jumbotron />

            <div className="m-2">
                <Space
                    direction="vertical"
                    style={{
                        width: '100%',
                    }}
                    size={[0, 48]}
                >

                    <Row>
                        <Col span={5}>
                            <Badge.Ribbon
                                text={`${product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}`}
                                color={product.quantity > 0 ? 'green' : 'red'}
                            >
                                <Image
                                    preview={{ visible: false }}
                                    width={200}
                                    src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                                    onClick={() => setVisible(true)}
                                />
                            </Badge.Ribbon>
                            <div style={{ display: 'none' }}>
                                <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
                                    <Image src={`${process.env.REACT_APP_API}/product/photo/${product._id}`} />
                                </Image.PreviewGroup>
                            </div>
                            <Button
                                style={{ marginTop: '12px' }}
                                type='primary'
                                block
                                icon={<ShoppingCartOutlined
                                />} 
                                onClick={() => handleCart(product)}
                            >
                                Add to cart
                            </Button>
                        </Col>

                        <Col span={12} push={1}>
                            <h4>{product.name}</h4>
                            <h5><b><u>Description</u></b></h5>
                            <p>{product.description}</p>

                            <Divider />

                            <h3><u>Price</u></h3>
                            <p className="lead fw-bold">
                                {product.price?.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD"
                                })}

                            </p>
                        </Col>

                        <Col span={6}>
                            <p><FolderOutlined /> Category:</p>
                            <li>{product?.category?.name}</li>

                            <p><small><CalendarOutlined /> Added on: {moment(product?.createdAt).fromNow()} </small></p>
                        </Col>
                    </Row>

                    <Divider dashed />

                    {
                        relatedProducts.length ? (
                            <>
                                <h4><u>Related Products</u></h4>
                                <Row>
                                    <ProductCard colSize={6} products={relatedProducts} />
                                </Row>
                            </>

                        ) : (
                            <h5>Sorry, there are no related products to {product.name}</h5>
                        )
                    }
                </Space>
            </div>

        </>
    )
}

export default ProductView