import { useNavigate } from "react-router-dom"
import { Button, Card, Divider, Spin } from 'antd'
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import { getClientToken, processPayment } from "../../actions/payment";
import { toast } from 'react-hot-toast'
import DropIn from "braintree-web-drop-in-react";

const CartSummary = () => {

    const [auth] = useAuth();
    const [cart, setCart] = useCart();

    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        if (auth?.token) {
            getClientToken().then(({ clientToken }) => {
                setClientToken(clientToken)
            })
        }
    }, [auth?.token]);

    const handleBuy = () => {
        setLoading(true);
        processPayment(instance, cart)
            .then((data) => {
                //if (data.success === true) {
                    console.log(data)
                    toast.success('Payment completed. Thank you for your order!')
                    localStorage.removeItem('cart');
                    setCart([]);
                    navigate('/dashboard/user/orders')
                //}
            }).finally(() => setLoading(false))
            .catch((error) => {
                //toast.erroror(error.message);
                console.log(error);
                setLoading(false)
            })
    }

    const cartTotal = () => {
        let total = 0;
        cart.map(({ price }) => (
            total = total + price
        ))

        return total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    };

    return (
        <>
            <Card size="default" title="Cart Summary" style={{ width: 300 }}>
                <p>Total: <b>{cartTotal()}</b></p>

                {
                    auth.token ? (
                        <>
                            {auth?.user?.address ? (
                                <>
                                    <p>{auth.user.address}</p>
                                    <Button
                                        type="primary"
                                        onClick={() => navigate('/dashboard/user/profile')}
                                    >Update Address</Button>

                                    <Divider />

                                    {clientToken && (
                                        <>
                                            <Spin spinning={loading}>
                                                <DropIn
                                                    options={{
                                                        authorization: clientToken,
                                                        paypal: {
                                                            flow: "vault"
                                                        }
                                                    }}
                                                    onInstance={(instance) => setInstance(instance)}
                                                />
                                            </Spin>
                                            <Button
                                                onClick={handleBuy}
                                                disabled={!auth?.user?.address || !instance}
                                                type='primary'
                                                block
                                            >
                                                Buy now
                                            </Button>
                                        </>
                                    )}

                                </>
                            ) : (
                                <>
                                    <p>No address found</p>
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={() => navigate('/dashboard/user/profile')}
                                    >Please add an address to continue</Button>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <Button
                                type="primary"
                                danger
                                onClick={() => navigate('/login', {
                                    state: "/cart",

                                })}
                            >Login to Checkout</Button>
                        </>
                    )
                }
                {/* <p>Card content</p> */}
            </Card>

        </>
    )
}

export default CartSummary